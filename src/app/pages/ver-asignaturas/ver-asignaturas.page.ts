import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-asignaturas',
  templateUrl: './ver-asignaturas.page.html',
  styleUrls: ['./ver-asignaturas.page.scss'],
})
export class VerAsignaturasPage implements OnInit {
  asignaturas: any[] = []; // Lista de asignaturas

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  ngOnInit() {
    this.obtenerAsignaturas();
  }

  // Método para obtener las asignaturas desde Firebase
  obtenerAsignaturas() {
    this.firebaseService.getAsignaturas().subscribe((data: any[]) => {
      this.asignaturas = data;
    });
  }

  // Método para eliminar una asignatura
  eliminarAsignatura(asignaturaId: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta asignatura?')) {
      this.firebaseService.deleteAsignatura(asignaturaId).then(() => {
        alert('Asignatura eliminada correctamente');
        this.obtenerAsignaturas(); // Actualiza la lista de asignaturas
      }).catch((error) => {
        console.error('Error al eliminar la asignatura:', error);
        alert('Ocurrió un error al intentar eliminar la asignatura.');
      });
    }
  }

  // Redirigir a la página de generación de QR
  irAGenerarQR(asignatura: any) {
    this.router.navigate(['/codigo-qr'], {
      queryParams: {
        asignaturaId: asignatura.id,
        profesorId: asignatura.profesorId,
      },
    });
  }

  getCardColor(index: number): string {
    return index % 2 === 0 ? '#FFEB3B' : '#F44336'; // Amarillo y Rojo
  }
  
}