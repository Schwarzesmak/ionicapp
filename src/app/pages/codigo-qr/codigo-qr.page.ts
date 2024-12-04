import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.page.html',
  styleUrls: ['./codigo-qr.page.scss'],
})
export class CodigoQrPage implements OnInit {
  qrCodeData: string | null = null;
  mensaje: string = '';
  asignaturaId: string | null = null;
  profesorId: string | null = null;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.asignaturaId = params['asignaturaId'];
      this.profesorId = params['profesorId'];
    });
  }

  generarQR() {
    if (this.mensaje && this.asignaturaId && this.profesorId) {
      this.qrCodeData = JSON.stringify({
        asignaturaId: this.asignaturaId,
        profesorId: this.profesorId,
        mensaje: this.mensaje,
      });
    }
  }
}
