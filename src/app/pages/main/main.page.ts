import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  nombreAlumno: string = '';

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    await this.cargarNombreUsuario();
  }

  async cargarNombreUsuario() {
    try {
      const nombre = await this.firebaseService.getAuthenticatedUserName();
      this.nombreAlumno = nombre ? `Bienvenido, ${nombre}` : 'Bienvenido, Alumno';
    } catch (error) {
      console.error('Error al obtener el nombre del usuario:', error);
    }
  }

  verAsistencia() {
    console.log('Navegando a la página de asistencia...');
  }

  registrarAsistencia() {
    console.log('Abriendo lector de QR...');
  }
}
