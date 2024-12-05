import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  firebaseSvc = inject(FirebaseService)
  utilSvc =  inject(UtilsService)

  ngOnInit() {
  }


  async submit(){
    if(this.form.valid){
      const loading =  await this.utilSvc.loading();
      await loading.present();

      this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(res => {

        this.utilSvc.presentToast({
          message: 'Correo enviado con éxito uwu',
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'mail-outline'
        });

        this.utilSvc.routerLink('/auth');
        this.form.reset();

      }).catch( error => {
        console.log(error);

        // Verificar el código de error y personalizar el mensaje
        let errorMessage = 'Error al enviar el correo'; // Mensaje por defecto
        if (error.code === 'auth/invalid-email') {
          errorMessage = 'El E-mail es inválido';
        }

        // Usar el mensaje personalizado en lugar del error.message
        this.utilSvc.presentToast({
          message: errorMessage,  // Aquí es donde usamos la variable errorMessage
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });

      }).finally (() => {
        loading.dismiss();
      });
    }
  }

}
