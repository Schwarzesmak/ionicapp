import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Asignatura } from 'src/app/models/asignaturas.model'; // Modelo Asignatura

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
    });
  }

  ngOnInit() {}

  async submit() {
    if (this.asignaturaForm.valid) {
      try {
        // Obtener el nombre del profesor autenticado
        const profesor = await this.firebaseService.getAuthenticatedUserName();

        if (profesor) {
          // Crear el objeto de asignatura
          const asignatura: Asignatura = {
            ...this.asignaturaForm.value,
            profesor: profesor, // Agregar el nombre del profesor autenticado
          };

          // Guardar la asignatura en Firestore
          await this.firebaseService.addDocumentToCollection('asignaturas', asignatura);

          console.log('Asignatura guardada con éxito');
          this.asignaturaForm.reset(); // Resetear el formulario
        } else {
          console.error('Error: No se pudo obtener el nombre del profesor');
        }
      } catch (error) {
        console.error('Error al guardar la asignatura:', error);
      }
    } else {
      console.error('Formulario inválido');
    }
  }
}
