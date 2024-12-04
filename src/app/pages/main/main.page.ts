import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  nombreAlumno: string = '';

  constructor(private firebaseService: FirebaseService, private router: Router) {}

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
    this.router.navigate(['/ver-asistencia']); // Navega a la página de asistencia
  }

  registrarAsistencia() {
    this.router.navigate(['/escaneo']); // Navega al lector de QR
  }

  cerrarSesion() {
    this.firebaseService.logout()
      .then(() => {
        console.log('Sesión cerrada');
        this.router.navigate(['/auth']);
      })
      .catch(error => {
        console.error('Error al cerrar sesión:', error);
      });
  }
  
  }

