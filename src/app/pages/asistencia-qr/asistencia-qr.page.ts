import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-asistencia-qr',
  templateUrl: './asistencia-qr.page.html',
  styleUrls: ['./asistencia-qr.page.scss'],
})
export class AsistenciaQRPage {
  qrResultado: string | null = null;

  constructor(private firebaseService: FirebaseService) {}

  async iniciarEscaneo() {
    // Simulación de escaneo de QR
    const escaneoSimulado = 'Asignatura: Programación de aplicaciones móviles\nID: 12345\nProfesor: Juan Pérez';

    this.qrResultado = escaneoSimulado;

    const datosQR = this.parsearDatosQR(escaneoSimulado);

    if (datosQR) {
      try {
        const usuario = await this.firebaseService.getUsuarioLogueado(); // Obtenemos el usuario autenticado
        if (usuario) {
          await this.registrarAsistencia(usuario, datosQR);
          console.log('Asistencia registrada correctamente.');
        } else {
          console.error('Usuario no autenticado.');
        }
      } catch (error) {
        console.error('Error al registrar asistencia:', error);
      }
    }
  }

  // Parsear el contenido del QR
  parsearDatosQR(qrTexto: string) {
    const lineas = qrTexto.split('\n');
    const asignatura = lineas[0].split(': ')[1];
    const idAsignatura = lineas[1].split(': ')[1];
    const profesor = lineas[2].split(': ')[1];

    return {
      asignatura,
      idAsignatura,
      profesor,
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
    };
  }

  // Registrar la asistencia en Firestore
  async registrarAsistencia(usuario: any, datosQR: any) {
    const asistencia = {
      alumnoId: usuario.id, // ID del estudiante autenticado
      nombre: usuario.displayName || usuario.email, // Nombre o email del estudiante
      asignatura: datosQR.asignatura,
      fecha: datosQR.fecha,
      hora: datosQR.hora,
      estado: 'presente',
      comentario: 'Asistencia registrada automáticamente',
    };

    // Registramos la asistencia en Firestore
    await this.firebaseService.addDocumentToCollection('asistencias', asistencia);
  }
}
