import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerAsignaturasPage } from './ver-asignaturas.page';

const routes: Routes = [
  {
    path: '',
    component: VerAsignaturasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerAsignaturasPageRoutingModule {}
