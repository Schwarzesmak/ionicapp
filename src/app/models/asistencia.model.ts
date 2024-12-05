export interface Asistencia {
    id?: string;            // ID único para cada registro de asistencia (opcional, generado por Firebase)
    profesorId: string;     // ID del profesor
    profesorNombre: string; // Nombre del profesor
    profesorApellido: string; // Apellido del profesor
  
    alumnoId: string;       // ID del alumno
    alumnoNombre: string;   // Nombre del alumno
    alumnoApellido: string; // Apellido del alumno
  
    asignaturaId: string;   // ID de la asignatura
    asignaturaNombre: string; // Nombre de la asignatura
  
    fecha: string;          // Fecha del registro (ej. '2024-12-04')
    hora: string;           // Hora del registro (ej. '14:30')
  }
  