import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';  // Asegúrate de importar el servicio

@Component({
  selector: 'app-ver-asistencia-profesor',
  templateUrl: './ver-asistencia-profesor.page.html',
  styleUrls: ['./ver-asistencia-profesor.page.scss'],
})
export class VerAsistenciaProfesorPage implements OnInit {

  alumnos: any[] = []; // Aquí almacenamos los alumnos que obtendremos de Firestore

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.obtenerAlumnos();  // Obtener los alumnos al cargar el componente
  }

  // Método para obtener los alumnos desde el servicio Firebase
  async obtenerAlumnos() {
    try {
      this.alumnos = await this.firebaseService.getAlumnos();  // Llamamos al servicio para obtener los alumnos
      console.log(this.alumnos);  // Verifica los datos obtenidos
    } catch (error) {
      console.error('Error al obtener los alumnos:', error);
    }
  }

  // Método para ver los detalles de un alumno
  verDetalles(alumno: any) {
    console.log('Ver detalles del alumno:', alumno);
    // Aquí puedes redirigir a otra página o mostrar más información
  }
}
