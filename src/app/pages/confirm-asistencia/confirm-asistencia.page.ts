import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Asistencia } from 'src/app/models/asistencia.model';
import { NavController } from '@ionic/angular'; // Importa NavController

@Component({
  selector: 'app-confirm-asistencia',
  templateUrl: './confirm-asistencia.page.html',
  styleUrls: ['./confirm-asistencia.page.scss'],
})
export class ConfirmAsistenciaPage implements OnInit {
  nombreAsignatura: string = '';
  nombreProfesor: string = '';
  fecha: string = '';
  hora: string = '';
  usuario: any = {}; // Para los datos del usuario logueado

  constructor(
    private firebaseService: FirebaseService,
    private navCtrl: NavController // Inyectar NavController correctamente
  ) {}

  async ngOnInit() {
    // Cargar los datos de asistencia desde localStorage
    const asistencia = JSON.parse(localStorage.getItem('asistencia') || '{}');
    if (asistencia && Object.keys(asistencia).length > 0) {
      this.nombreAsignatura = asistencia.nombreAsignatura || '';
      this.nombreProfesor = asistencia.nombreProfesor || '';
      this.fecha = asistencia.fecha || '';
      this.hora = asistencia.hora || '';
    } else {
      console.warn('No se encontraron datos de asistencia en localStorage.');
    }

    // Cargar los datos del usuario logueado desde Firebase
    try {
      this.usuario = await this.firebaseService.getUsuarioLogueado();
      if (!this.usuario) {
        console.warn('No se pudo obtener la información del usuario logueado.');
      }
    } catch (error) {
      console.error('Error al cargar el usuario logueado:', error);
    }
  }

  async confirmarAsistencia() {
    // Validar que no falten datos importantes
    if (!this.nombreAsignatura || !this.nombreProfesor) {
      console.error('Faltan datos para confirmar la asistencia.');
      return;
    }

    // Crear el objeto de asistencia
    const asistencia: Asistencia = {
      profesorNombre: this.nombreProfesor.split(' ')[0] || '', // Nombre del profesor
      profesorApellido: this.nombreProfesor.split(' ')[1] || '', // Apellido del profesor
      alumnouid:this.usuario.uid || '',
      alumnoNombre: this.usuario.name || '', // Nombre del alumno desde Firebase
      alumnoApellido: this.usuario.lastname || '', // Apellido del alumno desde Firebase
      asignaturaNombre: this.nombreAsignatura, // Nombre de la asignatura
      fecha: this.fecha || new Date().toISOString().split('T')[0], // Fecha actual si no hay valor en localStorage
      hora: this.hora || new Date().toLocaleTimeString(), // Hora actual si no hay valor en localStorage
    };

    // Guardar la asistencia en Firebase
    this.firebaseService
      .addDocumentToCollection('asistencias', asistencia)
      .then(() => {
        console.log('Asistencia registrada correctamente.');

        // Después de guardar en Firebase, eliminamos los datos de localStorage
        localStorage.removeItem('asistencia');

        // Redirigir a la página principal
        this.navCtrl.navigateRoot('/main'); // Reemplaza '/main' si tienes otro path
      })
      .catch((error) => {
        console.error('Error al registrar la asistencia:', error);
      });
  }
}
