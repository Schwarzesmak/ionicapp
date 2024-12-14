export interface Asignatura {
  id?: string;          // ID único que Firebase genera para cada asignatura (opcional)
  nombre: string;       // Nombre de la asignatura
  descripcion: string;  // Descripción de la asignatura
  profesorId?: string;  // El id del profesor asignado (opcional)
  cantidadclases: number;  // Cantidad de clases de la asignatura
  profesor: string;     // Nombre del profesor
  profesorApellido: string; // Apellido del profesor
}
