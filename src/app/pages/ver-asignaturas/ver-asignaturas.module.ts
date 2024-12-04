import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VerAsignaturasPageRoutingModule } from './ver-asignaturas-routing.module';
import { VerAsignaturasPage } from './ver-asignaturas.page';
import { QrCodeModule } from 'ng-qrcode';
import { SharedModule } from "../../shared/shared.module"; // Importa correctamente el módulo

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerAsignaturasPageRoutingModule,
    QrCodeModule,
    SharedModule
],
  declarations: [VerAsignaturasPage],
})
export class VerAsignaturasPageModule {}
