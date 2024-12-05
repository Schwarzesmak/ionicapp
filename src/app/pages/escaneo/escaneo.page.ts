import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';  // Asegúrate de importar tu servicio de Firebase

@Component({
  selector: 'app-escaneo',
  templateUrl: './escaneo.page.html',
  styleUrls: ['./escaneo.page.scss'],
})
export class EscaneoPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];
  currentUser: any = null;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private firebaseService: FirebaseService  // Inyectamos el servicio Firebase
  ) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

    // Obtener el usuario autenticado
    this.firebaseService.getUsuarioLogueado().then((user) => {
      this.currentUser = user;
    }).catch((error) => {
      console.error("Error al obtener los datos del usuario:", error);
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    // Escanear el código QR
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    // Verificar si hay códigos QR escaneados y extraer los parámetros
    if (barcodes.length > 0) {
      const scannedData = barcodes[0].displayValue; // Obtener el valor del código QR escaneado

      // Suponiendo que el QR contiene los datos en un formato como:
      // "Asignatura: El ojo de polloID: 8SgBbSS9p6jkFCsW5lEkProfesor: pablo"
      // Realizamos un split en función de los delimitadores
      const asignaturaMatch = scannedData.match(/Asignatura: (.*?)ID:/);
      const idMatch = scannedData.match(/ID: (.*?)Profesor:/);
      const profesorMatch = scannedData.match(/Profesor: (.*)/);

      // Extraemos los datos si los match se encuentran
      const nombreAsignatura = asignaturaMatch ? asignaturaMatch[1].trim() : null;
      const asignaturaId = idMatch ? idMatch[1].trim() : null;
      const nombreProfesor = profesorMatch ? profesorMatch[1].trim() : null;

      // Verificar si el usuario está logueado
      if (this.currentUser) {
        const nombreAlumno = this.currentUser.name;  // Usamos el nombre del alumno logueado

        // Asegurarnos de que los parámetros fueron extraídos correctamente
        if (nombreAsignatura && asignaturaId && nombreProfesor) {
          // Redirigir a la página de confirmación de asistencia con los datos del QR y el nombre del alumno
          this.navCtrl.navigateForward('/confirm-asistencia', {
            queryParams: {
              nombreAsignatura,
              asignaturaId,
              nombreProfesor,
              nombreAlumno,  // Ahora pasamos el nombre del alumno
            }
          });
        } else {
          this.presentAlert('El QR escaneado no contiene todos los datos necesarios.');
        }
      } else {
        this.presentAlert('No se encontró un usuario logueado.');
      }
    } else {
      this.presentAlert('No se detectó un código QR válido.');
    }
  }

  // Solicitar permisos de cámara
  async requestPermissions(): Promise<boolean> {
    console.log('Solicitando permisos de cámara...');
    const { camera } = await BarcodeScanner.requestPermissions();
    console.log('Permiso de cámara:', camera);
    return camera === 'granted' || camera === 'limited';
  }

  // Mostrar alerta
  async presentAlert(message: string = 'Para usar la aplicación autorizar los permisos de cámara'): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
