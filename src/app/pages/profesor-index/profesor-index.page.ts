import { AuthPage } from './../auth/auth.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service'; // Asegúrate de tener un servicio de autenticación

@Component({
  selector: 'app-profesor-index',
  templateUrl: './profesor-index.page.html',
  styleUrls: ['./profesor-index.page.scss'],
})
export class ProfesorIndexPage implements OnInit {

  constructor(
    private router: Router,
    private FirebaseService: FirebaseService  // Asegúrate de tener este servicio
  ) { }

  ngOnInit() {
  }

  // Método para cerrar sesión
  cerrarSesion() {
    this.FirebaseService.logout().then(() => {
      this.router.navigate(['/auth']); // Redirige a la página de login
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un problema al cerrar sesión.');
    });
  }

}
