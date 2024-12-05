import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service'; // Asegúrate de que tienes el servicio de Firebase

@Component({
  selector: 'app-confirm-asistencia',
  templateUrl: './confirm-asistencia.page.html',
  styleUrls: ['./confirm-asistencia.page.scss'],
})
export class ConfirmAsistenciaPage implements OnInit {
  nombreAsignatura: string = '';
  nombreProfesor: string = '';
  nombreAlumno: string = ''; // Asegúrate de declarar la propiedad
  fecha: string = '';
  hora: string = '';
  usuario: any = {}; // Aquí se almacenará el usuario que confirma la asistencia

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    // Obtener los datos almacenados en localStorage
    const asistencia = JSON.parse(localStorage.getItem('asistencia') || '{}');
    if (asistencia) {
      this.nombreAsignatura = asistencia.nombreAsignatura;
      this.nombreProfesor = asistencia.nombreProfesor;
      this.nombreAlumno = asistencia.nombreAlumno; // Asigna el valor de nombreAlumno desde localStorage
      this.fecha = asistencia.fecha;
      this.hora = asistencia.hora;
    }

    // Obtener el usuario actual del localStorage (o de Firebase si es necesario)
    this.usuario = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  // Confirmar asistencia, almacenando los datos en Firebase
  confirmarAsistencia() {
    const asistencia = {
      profesorNombre: this.nombreProfesor.split(' ')[0], // Solo el primer nombre
      profesorApellido: this.nombreProfesor.split(' ')[1] || '',  // Suponiendo que el apellido está después del primer nombre
      alumnoNombre: this.nombreAlumno.split(' ')[0],  // Solo el primer nombre
      alumnoApellido: this.nombreAlumno.split(' ')[1] || '',  // Suponiendo que el apellido está después del primer nombre
      asignaturaNombre: this.nombreAsignatura,
      fecha: this.fecha,
      hora: this.hora,
      // Agregar el nombre y apellido del usuario que está confirmando la asistencia
      usuarioNombre: this.usuario.name, // O cualquier otro campo que contenga el nombre
      usuarioApellido: this.usuario.lastName, // O cualquier otro campo que contenga el apellido
    };

    // Almacenar la asistencia en Firebase
    this.firebaseService.addDocumentToCollection('asistencias', asistencia).then(() => {
      // Redirigir o mostrar mensaje de éxito
      console.log('Asistencia registrada correctamente');
      // Eliminar los datos de localStorage después de confirmar
      localStorage.removeItem('asistencia');
    }).catch((error) => {
      console.error('Error al registrar la asistencia:', error);
    });
  }
}
