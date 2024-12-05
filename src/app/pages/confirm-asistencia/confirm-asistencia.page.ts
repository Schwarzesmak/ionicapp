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
  usuario: any = {};

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
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

    this.usuario = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!this.usuario.name || !this.usuario.lastname) {
      console.warn("Información del usuario no encontrada en localStorage.");
    }
  }

  confirmarAsistencia() {
    if (!this.nombreAsignatura || !this.nombreAlumno || !this.nombreProfesor || !this.fecha || !this.hora) {
      console.error('Faltan datos para confirmar la asistencia.');
      return;
    }

    const asistencia: Asistencia = {
      profesorNombre: this.nombreProfesor.split(' ')[0] || '',
      profesorApellido: this.nombreProfesor.split(' ')[1] || '',
      alumnoNombre: this.nombreAlumno.split(' ')[0] || '',
      alumnoApellido: this.nombreAlumno.split(' ')[1] || '',
      asignaturaNombre: this.nombreAsignatura,
      fecha: this.fecha,
      hora: this.hora,
    };

    this.firebaseService.addDocumentToCollection('asistencias', asistencia)
      .then(() => {
        console.log('Asistencia registrada correctamente.');
        localStorage.removeItem('asistencia');
      })
      .catch((error) => {
        console.error('Error al registrar la asistencia:', error);
      });
  }
}
