import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerarAsignaturasPage } from './generar-asignaturas.page';

const routes: Routes = [
  {
    path: '',
    component: GenerarAsignaturasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerarAsignaturasPageRoutingModule {}
