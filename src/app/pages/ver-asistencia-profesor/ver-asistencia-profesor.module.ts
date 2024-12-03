import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerAsistenciaProfesorPageRoutingModule } from './ver-asistencia-profesor-routing.module';

import { VerAsistenciaProfesorPage } from './ver-asistencia-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerAsistenciaProfesorPageRoutingModule
  ],
  declarations: [VerAsistenciaProfesorPage]
})
export class VerAsistenciaProfesorPageModule {}
