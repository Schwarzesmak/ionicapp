import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-escaneo',
  templateUrl: './escaneo.page.html',
  styleUrls: ['./escaneo.page.scss'],
})
export class EscaneoPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(private alertController: AlertController, private navCtrl: NavController) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();

    if (barcodes.length > 0) {
      this.barcodes.push(...barcodes);

      // Guardar solo el nombre de la asignatura en localStorage
      const scannedData = {
        nombreAsignatura: barcodes[0].rawValue.split('-')[0] || 'Sin nombre',
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toLocaleTimeString(),
      };

      localStorage.setItem('asistencia', JSON.stringify(scannedData));

      // Redirigir a la página de confirmación
      this.navCtrl.navigateForward('/confirm-asistencia');
    } else {
      console.warn('No se escanearon códigos válidos.');
    }
  }


  async requestPermissions(): Promise<boolean> {
    console.log('Solicitando permisos de cámara...');
    const { camera } = await BarcodeScanner.requestPermissions();
    console.log('Permiso de cámara:', camera);
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Para usar la aplicación autoriza los permisos de cámara',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
