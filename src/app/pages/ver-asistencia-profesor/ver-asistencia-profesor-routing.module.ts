import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerAsistenciaProfesorPage } from './ver-asistencia-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: VerAsistenciaProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerAsistenciaProfesorPageRoutingModule {}
