import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';  // Asegúrate de importar el servicio
import { doc, deleteDoc, getFirestore } from 'firebase/firestore'; // Asegúrate de importar correctamente

@Component({
  selector: 'app-ver-asistencia-profesor',
  templateUrl: './ver-asistencia-profesor.page.html',
  styleUrls: ['./ver-asistencia-profesor.page.scss'],
})
export class VerAsistenciaProfesorPage implements OnInit {

  asistencias: any[] = []; // Aquí almacenamos las asistencias que obtendremos de Firestore

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.obtenerAsistencias();  // Obtener las asistencias al cargar el componente
  }

  // Método para obtener las asistencias desde el servicio Firebase
  async obtenerAsistencias() {
    try {
      // Aquí obtenemos las asistencias desde Firestore a través del servicio
      this.asistencias = await this.firebaseService.getCollection('asistencias');  
      console.log(this.asistencias);  // Verifica los datos obtenidos
    } catch (error) {
      console.error('Error al obtener las asistencias:', error);
    }
  }

  // Método para eliminar una asistencia
  async eliminarAsistencia(asistencia: any) {
    try {
      // Confirmar la eliminación
      const isConfirmed = window.confirm(`¿Estás seguro de que deseas eliminar la asistencia de ${asistencia.alumnoNombre} ${asistencia.alumnoApellido}?`);
      if (!isConfirmed) return;

      // Asegúrate de que el 'id' esté disponible para la eliminación
      const id = asistencia.id;
      if (id) {
        // Asegúrate de que Firestore esté inicializado correctamente y utiliza getFirestore()
        const db = getFirestore(); // Obtén la instancia de Firestore
        const docRef = doc(db, 'asistencias', id); // Crea la referencia al documento de Firestore
        await deleteDoc(docRef); // Elimina el documento de Firestore

        // Actualiza la lista local eliminando el documento
        this.asistencias = this.asistencias.filter(a => a.id !== id);
        console.log(`Asistencia eliminada: ${id}`);
      } else {
        console.error('No se encontró el ID de la asistencia para eliminar');
      }
    } catch (error) {
      console.error('Error al eliminar la asistencia:', error);
    }
  }
}
