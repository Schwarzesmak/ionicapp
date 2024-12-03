import { Component } from '@angular/core';

@Component({
  selector: 'app-asistencia-qr', // Selector corregido
  templateUrl: './asistencia-qr.page.html',
  styleUrls: ['./asistencia-qr.page.scss'],
})
export class AsistenciaQRPage {
  qrResultado: string | null = null;

  constructor() {}

  iniciarEscaneo() {
    // Aquí se integrará la lógica para escanear QR
    this.qrResultado = 'Simulación: Código QR escaneado correctamente.';
  }
}
