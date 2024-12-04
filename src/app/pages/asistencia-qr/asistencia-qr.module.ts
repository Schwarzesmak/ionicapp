import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaQRPageRoutingModule } from './asistencia-qr-routing.module';

import { AsistenciaQRPage } from './asistencia-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaQRPageRoutingModule
  ],
  declarations: [AsistenciaQRPage]
})
export class AsistenciaQRPageModule {}
