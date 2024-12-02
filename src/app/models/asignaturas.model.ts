export interface Asignatura {
    id: string;          // ID único que Firebase genera para cada asignatura (opcional)
    nombre: string;         // Nombre de la asignatura
    descripcion: string; // Descripción de la asignatura (opcional)
    profesorId?: string;  // El id del profesor asignado (opcional)
  }
  