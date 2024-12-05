import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-escaneo',
  templateUrl: './escaneo.page.html',
  styleUrls: ['./escaneo.page.scss'],
})
export class EscaneoPage implements OnInit {
  barcodes: Barcode[] = [];
  currentUser: any = null;

  constructor(
    private navCtrl: NavController,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    // Obtener el usuario autenticado
    this.firebaseService.getUsuarioLogueado().then((user) => {
      this.currentUser = user;
    });
  }

  async scan(): Promise<void> {
    // Escanear el código QR
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    // Si se escaneó un código QR
    if (barcodes.length > 0) {
      const scannedData = barcodes[0].displayValue;

      // Extraer los datos del QR (suponiendo un formato predefinido)
      const asignaturaMatch = scannedData.match(/Asignatura: (.*?)ID:/);
      const idMatch = scannedData.match(/ID: (.*?)Profesor:/);
      const profesorMatch = scannedData.match(/Profesor: (.*)/);

      const nombreAsignatura = asignaturaMatch ? asignaturaMatch[1].trim() : null;
      const asignaturaId = idMatch ? idMatch[1].trim() : null;
      const nombreProfesor = profesorMatch ? profesorMatch[1].trim() : null;

      // Si el usuario está logueado y los datos del QR son correctos
      if (this.currentUser && nombreAsignatura && asignaturaId && nombreProfesor) {
        const nombreAlumno = this.currentUser.name;

        // Redirigir a la página de confirmación de asistencia
        this.navCtrl.navigateForward('/confirm-asistencia', {
          queryParams: {
            nombreAsignatura,
            asignaturaId,
            nombreProfesor,
            nombreAlumno,
          },
        });
      }
    }
  }
}
