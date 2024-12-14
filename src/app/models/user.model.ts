export interface User {
  id:string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  role: string;  // Campo de rol (por ejemplo: 'alumno', 'profesor', etc.)
  subject?: string;  // Solo si es profesor
}
