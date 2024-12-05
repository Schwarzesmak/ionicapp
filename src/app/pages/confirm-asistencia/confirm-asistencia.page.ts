import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {
    // Obtener los datos almacenados en localStorage
    const asistencia = JSON.parse(localStorage.getItem('asistencia') || '{}');
    if (asistencia) {
      this.nombreAsignatura = asistencia.nombreAsignatura;
      this.nombreProfesor = asistencia.nombreProfesor;
      this.nombreAlumno = asistencia.nombreAlumno;
      this.fecha = asistencia.fecha;
      this.hora = asistencia.hora;
    }
  }

  // Confirmar asistencia, solo los datos en localStorage
  confirmarAsistencia() {
    console.log('Asistencia confirmada');
    // Eliminar los datos de localStorage después de confirmar
    localStorage.removeItem('asistencia');
  }
}
