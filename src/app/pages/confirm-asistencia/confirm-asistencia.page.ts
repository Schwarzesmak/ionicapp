import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';  // Importa tu servicio de Firebase

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

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    // Recibir los parámetros pasados desde la página de escaneo
    this.route.queryParams.subscribe((params) => {
      this.nombreAsignatura = params['nombreAsignatura'];
      this.nombreProfesor = params['nombreProfesor'];
      this.nombreAlumno = params['nombreAlumno'];
      const currentDate = new Date();
      this.fecha = currentDate.toLocaleDateString();
      this.hora = currentDate.toLocaleTimeString();
    });
  }

  // Método para confirmar la asistencia
  confirmarAsistencia() {
    const asistencia = {
      profesorId: 'ID del profesor',  // Aquí debes obtener el ID real del profesor
      profesorNombre: this.nombreProfesor.split(' ')[0], // Solo el primer nombre
      profesorApellido: this.nombreProfesor.split(' ')[1] || '',  // Suponiendo que el apellido está después del primer nombre
      alumnoNombre: this.nombreAlumno.split(' ')[0],  // Solo el primer nombre
      alumnoApellido: this.nombreAlumno.split(' ')[1] || '',  // Suponiendo que el apellido está después del primer nombre
      asignaturaId: 'ID de la asignatura',  // Aquí debes obtener el ID real de la asignatura
      asignaturaNombre: this.nombreAsignatura,
      fecha: this.fecha,
      hora: this.hora,
    };

    // Guardar la asistencia en Firebase
    this.firebaseService.addDocumentToCollection('asistencias', asistencia).then(() => {
      // Redirigir al usuario a la página de éxito o mostrar un mensaje
      console.log('Asistencia registrada correctamente');
    }).catch((error) => {
      console.error('Error al registrar la asistencia:', error);
    });
  }
}
