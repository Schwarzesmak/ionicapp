import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {
  nombreAlumno: string = 'Nombre del Alumno'; // A conectar con Firebase

  constructor() {}

  // Método para "Ver asistencia"
  verAsistencia() {
    console.log('Navegando a la página de asistencia...');
    // Aquí iría la lógica para navegar a la página de asistencia
  }

  // Método para "Registrar asistencia" con QR
  registrarAsistencia() {
    console.log('Abriendo lector de QR...');
    // Aquí iría la lógica para abrir el escáner QR
  }
}
