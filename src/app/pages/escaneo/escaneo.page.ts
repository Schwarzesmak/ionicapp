import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-escaneo',
  templateUrl: './escaneo.page.html',
  styleUrls: ['./escaneo.page.scss'],
})
export class EscaneoPage implements OnInit {
  barcodes: Barcode[] = [];
  currentUser: any = null;

  constructor(
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Obtener el usuario autenticado
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  async scan(): Promise<void> {
    // Escanear el código QR
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    // Si se escaneó un código QR
    if (barcodes.length > 0) {
      const scannedData = barcodes[0].displayValue;

      // Extraer los datos del QR (suponiendo un formato predefinido)
      const asignaturaMatch = scannedData.match(/Asignatura: (.*?)\n/);
      const profesorMatch = scannedData.match(/Profesor: (.*)/);

      const nombreAsignatura = asignaturaMatch ? asignaturaMatch[1].trim() : null;
      const nombreProfesor = profesorMatch ? profesorMatch[1].trim() : null;

      // Si el usuario está logueado y los datos del QR son correctos
      if (this.currentUser && nombreAsignatura && nombreProfesor) {
        const nombreAlumno = this.currentUser.name;

        // Almacenar los datos en localStorage
        localStorage.setItem('asistencia', JSON.stringify({
          nombreAsignatura,
          nombreProfesor,
          nombreAlumno,
          fecha: new Date().toLocaleDateString(),
          hora: new Date().toLocaleTimeString()
        }));

        // Redirigir a la página de confirmación de asistencia
        this.navCtrl.navigateForward('/confirm-asistencia');
      } else {
        console.log('Faltan datos o el usuario no está logueado.');
      }
    }
  }
}
