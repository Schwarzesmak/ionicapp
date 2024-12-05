import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-asistencia',
  templateUrl: './confirm-asistencia.page.html',
  styleUrls: ['./confirm-asistencia.page.scss'],
})
export class ConfirmAsistenciaPage implements OnInit {
  alumnoId: string = '';
  alumnoNombre: string = '';
  alumnoApellido: string = '';
  asignaturaId: string = '';
  asignaturaNombre: string = '';

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      this.asignaturaId = params['asignaturaId'];
      this.asignaturaNombre = params['asignaturaNombre'];

      // Obtener datos del alumno autenticado
    });
  }




  cancelarAsistencia() {
    this.navCtrl.pop(); // Regresar sin confirmar
  }
}
