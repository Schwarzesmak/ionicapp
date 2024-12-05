import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Asignatura } from 'src/app/models/asignaturas.model';  // Modelo Asignatura

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

  async submit() {
    if (this.asignaturaForm.valid) {
      // Obtener el nombre del profesor autenticado
      const profesor = await this.firebaseService.getAuthenticatedUserName();

      if (profesor) {
        // Crear la asignatura con el nombre del profesor
        const asignatura: Asignatura = {
          ...this.asignaturaForm.value,
          profesor: profesor // Agregar el nombre del profesor
        };

        // Guardar la asignatura en Firestore
        this.firebaseService
          .setDocument('asignaturas/' + asignatura.nombre, asignatura)
          .then(() => {
            console.log('Asignatura guardada con éxito');
            this.asignaturaForm.reset();
          })
          .catch((error) => {
            console.error('Error al guardar la asignatura:', error);
          });
      } else {
        console.error('Error: No se pudo obtener el nombre del profesor');
      }
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
