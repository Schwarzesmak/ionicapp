import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas'; // Asegúrate de instalar esta librería: npm install html2canvas
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo-qr.page.html',
  styleUrls: ['./codigo-qr.page.scss'],
})
export class CodigoPage implements OnInit {
  qrText = '';       // Texto del código QR
  asignaturaNombre = '';
  profesorNombre = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.asignaturaNombre = params['nombre'];
      this.profesorNombre = params['profesor'];
      this.qrText = `Asignatura: ${this.asignaturaNombre}, Profesor: ${this.profesorNombre}`;
    });
  }
  // Método para capturar la pantalla y descargar como imagen
  captureScreen() {
    const qrElement = document.getElementById('qrImage'); // Contenedor del QR

    if (!qrElement) {
      console.error('No se encontró el elemento QR.');
      return;
    }

    html2canvas(qrElement).then((canvas) => {
      const link = document.createElement('a');
      link.download = `${this.asignaturaNombre}-QR.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }).catch((error) => {
      console.error('Error al capturar la pantalla:', error);
    });
  }
}
