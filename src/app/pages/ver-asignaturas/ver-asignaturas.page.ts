import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ModalController } from '@ionic/angular';
import { ModalMessageComponent } from 'src/app/shared/components/modal-message/modal-message.component'; // Asegúrate de importar el modal

@Component({
  selector: 'app-ver-asignaturas',
  templateUrl: './ver-asignaturas.page.html',
  styleUrls: ['./ver-asignaturas.page.scss'],
})
export class VerAsignaturasPage implements OnInit {
  asignaturas: any[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private modalCtrl: ModalController // Agregar el ModalController para abrir el modal
  ) {}

  ngOnInit() {
    // Obtener las asignaturas desde Firebase
    this.firebaseService.getAsignaturas().subscribe(asignaturas => {
      this.asignaturas = asignaturas;
      console.log(this.asignaturas); // Para verificar si los datos llegan correctamente
    });
  }

  // Método para eliminar una asignatura
  eliminarAsignatura(id: string) {
    this.firebaseService.eliminarAsignatura(id).then(() => {
      console.log('Asignatura eliminada con éxito');
      // Vuelve a cargar las asignaturas después de la eliminación
      this.reloadAsignaturas();
    }).catch(error => {
      console.log('Error al eliminar asignatura:', error);
    });
  }

  // Método para recargar las asignaturas
  reloadAsignaturas() {
    this.firebaseService.getAsignaturas().subscribe(asignaturas => {
      this.asignaturas = asignaturas;
    });
  }

  // Método para generar código QR
  async generarCodigoQR(asignatura: any) {
    // Abrir el modal para que el usuario ingrese un mensaje
    const modal = await this.modalCtrl.create({
      component: ModalMessageComponent,
    });

    // Cuando el modal se cierra, obtienes el mensaje que se ingresó
    modal.onDidDismiss().then((result) => {
      const mensaje = result.data;
      if (mensaje) {
        // Generar el código QR con el ID de la asignatura, el ID del profesor y el mensaje
        const qrData = {
          asignaturaId: asignatura.id,
          profesorId: asignatura.profesorId,  // Asegúrate de que este campo exista en tus datos
          mensaje: mensaje
        };
        // Aquí puedes pasar los datos al componente que genera el QR
        console.log('QR Data:', qrData); // Verifica si los datos son correctos

        // Después, puedes usar estos datos en tu plantilla HTML
        // para generar el código QR
        this.qrCodeData = `Asignatura ID: ${qrData.asignaturaId}, Profesor ID: ${qrData.profesorId}, Mensaje: ${qrData.mensaje}`;
      }
    });

    await modal.present();
  }

  qrCodeData: string = ''; // Aquí se almacenará la cadena que se pasará al QR
}
