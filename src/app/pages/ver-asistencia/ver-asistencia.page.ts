import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.page.html',
  styleUrls: ['./ver-asistencia.page.scss'],
})
export class VerAsistenciaPage implements OnInit {
  asistencia: any = null;  // Se inicializa la propiedad asistencia

  ngOnInit() {
    // Obtener los datos de la asistencia desde localStorage
    const asistenciaData = localStorage.getItem('asistencia_confirmada');
    if (asistenciaData) {
      this.asistencia = JSON.parse(asistenciaData);
    } else {
      console.warn('No se encontró información de asistencia.');
    }
  }
}
