import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // Asegúrate de importar ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { GenerarAsignaturasPageRoutingModule } from './generar-asignaturas-routing.module';

import { GenerarAsignaturasPage } from './generar-asignaturas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // IMPORTANTE: Agrega ReactiveFormsModule aquí
    IonicModule,
    GenerarAsignaturasPageRoutingModule
  ],
  declarations: [GenerarAsignaturasPage]
})
export class GenerarAsignaturasPageModule {}
