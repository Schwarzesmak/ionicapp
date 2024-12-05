import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';  // Asegúrate de tener esta interfaz
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';  // Importar el Router

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  constructor(
    private router: Router,  // Inyectar el Router
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService
  ) {}

  form = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl(''),  // Deja el valor inicial vacío
    subject: new FormControl({ value: '', disabled: true }),
  });

  ngOnInit() {
    this.form.controls.role.valueChanges.subscribe(role => {
      this.updateEmailDomain(role);
      this.updateSubjectField(role);
    });

    // Si el usuario es profesor, cargar su asignatura desde Firebase
    const uid = this.utilSvc.getFromLocalStorage('user')?.uid;
    if (uid) {
      this.loadUserData(uid);
    }
  }

  updateEmailDomain(role: string) {
    const emailControl = this.form.controls.email;
    if (role === 'estudiante') {
      emailControl.setValue(emailControl.value.replace(/@profesor.duoc.cl$/, '') + '@duocuc.cl');
    } else if (role === 'profesor') {
      emailControl.setValue(emailControl.value.replace(/@duocuc.cl$/, '') + '@profesor.duoc.cl');
    }
  }

  updateSubjectField(role: string) {
    const subjectControl = this.form.controls.subject;
    if (role === 'profesor') {
      subjectControl.enable();
    } else {
      subjectControl.disable();
    }
  }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilSvc.loading();
      await loading.present();

      this.firebaseSvc.signUp(this.form.value as User).then(async res => {
        await this.firebaseSvc.updateUser(this.form.value.name);

        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);
        this.setUserInfo(uid);
        console.log(res);
      }).catch(error => {
        console.log(error);
        this.utilSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline',
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }

  async setUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilSvc.loading();
      await loading.present();

      let path = `users/${uid}`;
      delete this.form.value.password;

      // Aseguramos que si es un profesor, almacenamos la asignatura
      if (this.form.controls.role.value === 'profesor') {
        this.form.value.subject = this.form.controls.subject.value;  // Asignar la asignatura seleccionada
      }

      this.firebaseSvc.setDocument(path, this.form.value).then(async res => {
        this.utilSvc.saveInLocalStorage('user', this.form.value);
        this.router.navigate(['/auth']);  // Redirigir a la página de login
        this.form.reset();
      }).catch(error => {
        console.log(error);
        this.utilSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline',
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }

  async loadUserData(uid: string) {
    const userData = await this.firebaseSvc.getDocument(`users/${uid}`);
    if (userData) {
      this.form.patchValue(userData);
      // Si el rol es profesor, habilitar la asignatura
      if (userData['role'] === 'profesor') {  // Usamos el acceso con el índice
        this.form.controls.subject.setValue(userData['subject']);
        this.updateSubjectField('profesor');
      }
    }
  }
}
