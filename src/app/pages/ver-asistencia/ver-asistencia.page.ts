import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.page.html',
  styleUrls: ['./ver-asistencia.page.scss'],
})
export class VerAsistenciaPage implements OnInit {
  asistencias = [
    { fecha: 'Aqui iria una fecha, si tuviera la base de datos', asignatura: 'Aqui iria una asignatura, si tuviera la base de datos', estado: 'Aqui iria un estado, si tuviera la base de datos' },
    { fecha: '2024-12-01', asignatura: 'Matemáticas', estado: 'Presente' },
    { fecha: '2024-11-30', asignatura: 'Física', estado: 'Ausente' },
    { fecha: '2024-11-29', asignatura: 'Química', estado: 'Justificado' },
  ];

  constructor() {}

  ngOnInit() {}
}
