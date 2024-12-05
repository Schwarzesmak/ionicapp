import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Asistencia } from 'src/app/models/asistencia.model';

@Component({
  selector: 'app-confirm-asistencia',
  templateUrl: './confirm-asistencia.page.html',
  styleUrls: ['./confirm-asistencia.page.scss'],
})
export class ConfirmAsistenciaPage implements OnInit {
  nombreAsignatura: string = '';
  nombreProfesor: string = '';
  nombreAlumno: string = '';
  fecha: string = '';
  hora: string = '';
  usuario: any = {};  // Para los datos del usuario logueado

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    // Cargar los datos de asistencia desde localStorage
    const asistencia = JSON.parse(localStorage.getItem('asistencia') || '{}');
    if (asistencia && Object.keys(asistencia).length > 0) {
      this.nombreAsignatura = asistencia.nombreAsignatura || '';
      this.nombreProfesor = asistencia.nombreProfesor || '';
      this.nombreAlumno = asistencia.nombreAlumno || '';
      this.fecha = asistencia.fecha || '';
      this.hora = asistencia.hora || '';
    } else {
      console.warn("No se encontraron datos de asistencia en localStorage.");
    }

    // Cargar los datos del usuario desde localStorage
    this.usuario = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!this.usuario.name || !this.usuario.lastname) {
      console.warn("Información del usuario no encontrada en localStorage.");
    }
  }

  confirmarAsistencia() {
    // Validar que no falten datos importantes
    if (!this.nombreAsignatura || !this.nombreAlumno || !this.nombreProfesor || !this.fecha || !this.hora || !this.usuario.name || !this.usuario.lastname) {
      console.error('Faltan datos para confirmar la asistencia.');
      return;
    }

    // Crear el objeto de asistencia
    const asistencia: Asistencia = {
      profesorNombre: this.nombreProfesor.split(' ')[0] || '',  // Nombre del profesor
      profesorApellido: this.nombreProfesor.split(' ')[1] || '', // Apellido del profesor
      alumnoNombre: this.nombreAlumno.split(' ')[0] || '',      // Nombre del alumno
      alumnoApellido: this.nombreAlumno.split(' ')[1] || '',    // Apellido del alumno
      asignaturaNombre: this.nombreAsignatura,                  // Nombre de la asignatura
      fecha: this.fecha,                                        // Fecha
      hora: this.hora,                                          // Hora
    };

    // Guardar la asistencia en Firebase
    this.firebaseService.addDocumentToCollection('asistencias', asistencia)
      .then(() => {
        console.log('Asistencia registrada correctamente.');

        // Después de guardar en Firebase, eliminamos los datos de localStorage
        localStorage.removeItem('asistencia');
        localStorage.removeItem('currentUser');
      })
      .catch((error) => {
        console.error('Error al registrar la asistencia:', error);
      });
  }
}
