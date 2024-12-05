import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.page.html',
  styleUrls: ['./codigo-qr.page.scss'],
})
export class CodigoPage implements OnInit {
  qrText: string = ''; // Contenido del QR
  asignaturaId: string;
  nombre: string;
  profesor: string;

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private platform: Platform
  ) {}

  ngOnInit() {
    // Obtener los datos desde queryParams
    this.route.queryParams.subscribe(params => {
      this.asignaturaId = params['asignaturaId'];
      this.nombre = params['nombre'];
      this.profesor = params['profesor'];

      // Generar el texto del QR con los datos de la asignatura
      this.qrText = `Asignatura: ${this.nombre}\nID: ${this.asignaturaId}\nProfesor: ${this.profesor}`;
    });
  }

  // Función para capturar y compartir el QR
  captureScreen() {
    const element = document.getElementById('qrImage') as HTMLElement;

    html2canvas(element, { scale: 2 }).then((canvas: HTMLCanvasElement) => {
      if (this.platform.is('capacitor')) {
        this.shareImage(canvas);
      } else {
        this.downloadImage(canvas);
      }
    });
  }

  downloadImage(canvas: HTMLCanvasElement) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = "qr.png";
    link.click();
  }

  async shareImage(canvas: HTMLCanvasElement) {
    let base64 = canvas.toDataURL();
    let path = "qr.png";

    const loading = await this.loadingController.create({ spinner: 'crescent' });
    await loading.present();

    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Cache,
    }).then(async (res) => {
      let uri = res.uri;
      await Share.share({ url: uri });
      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache,
      });
    }).finally(() => {
      loading.dismiss();
    });
  }
}
