import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciaQRPage } from './asistencia-qr.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaQRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciaQRPageRoutingModule {}
