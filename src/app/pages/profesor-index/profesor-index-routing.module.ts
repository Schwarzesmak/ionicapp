import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorIndexPage } from './profesor-index.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorIndexPageRoutingModule {}
