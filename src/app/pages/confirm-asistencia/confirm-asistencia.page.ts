import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-asistencia',
  templateUrl: './confirm-asistencia.page.html',
  styleUrls: ['./confirm-asistencia.page.scss'],
})
export class ConfirmAsistenciaPage implements OnInit {
  nombreAsignatura: string = '';
  fecha: string = '';
  hora: string = '';
  usuario: any = {};

  constructor(
    private firebaseService: FirebaseService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    const asistencia = JSON.parse(localStorage.getItem('asistencia') || '{}');

    if (asistencia && Object.keys(asistencia).length > 0) {
      this.nombreAsignatura = asistencia.nombreAsignatura || '';
      this.fecha = asistencia.fecha || '';
      this.hora = asistencia.hora || '';
    } else {
      console.warn('No se encontraron datos de asistencia en localStorage.');
    }

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
    if (!this.nombreAsignatura || !this.fecha || !this.hora) {
      console.error('Faltan datos para confirmar la asistencia.');
      return;
    }

    const asistencia = {
      alumnoNombre: this.usuario.name || '',
      alumnoApellido: this.usuario.lastname || '',
      asignaturaNombre: this.nombreAsignatura,
      fecha: this.fecha,
      hora: this.hora,
    };

    try {
      // Guardar los datos de asistencia en localStorage
      localStorage.setItem('asistencia_confirmada', JSON.stringify(asistencia));

      // Registrar la asistencia en Firebase
      await this.firebaseService.addDocumentToCollection('asistencias', asistencia);
      console.log('Asistencia registrada correctamente.');

      const alumnoId = this.usuario.id;
      await this.firebaseService.updateDocument(`users/${alumnoId}`, {
        presente: asistencia.fecha,
      });

      // Limpiar el localStorage y redirigir a la página principal
      localStorage.removeItem('asistencia');
      this.navCtrl.navigateRoot('/main');
    } catch (error) {
      console.error('Error al registrar la asistencia:', error);
    }
  }
}
