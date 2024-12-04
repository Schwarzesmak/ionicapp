import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Asignatura } from 'src/app/models/asignaturas.model';  // Asegúrate de tener el modelo Asignatura

@Component({
  selector: 'app-generar-asignaturas',
  templateUrl: './generar-asignaturas.page.html',
  styleUrls: ['./generar-asignaturas.page.scss'],
})
export class GenerarAsignaturasPage implements OnInit {
  asignaturaForm: FormGroup;

  constructor(private firebaseService: FirebaseService) {
    this.asignaturaForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      cantidadclases: new FormControl('', [Validators.required]),
      // Añade otros campos según sea necesario
    });
  }

  ngOnInit() {}

  // Método para manejar el submit
  submit() {
    if (this.asignaturaForm.valid) {
      // Crear la asignatura desde el formulario
      const asignatura: Asignatura = this.asignaturaForm.value;

      // Llamar al servicio para guardar la asignatura en la base de datos
      this.firebaseService.addDocumentToCollection('asignaturas', asignatura)  // Cambié aquí a `addDocumentToCollection`
        .then(() => {
          console.log('Asignatura guardada con éxito');
          // Resetear el formulario después de guardar
          this.asignaturaForm.reset();
        })
        .catch(error => {
          console.error('Error al guardar la asignatura:', error);
        });
    }
  }
}
