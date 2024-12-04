import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoQrPageRoutingModule } from './codigo-qr-routing.module';

import { CodigoQrPage } from './codigo-qr.page';
import { QrCodeModule } from 'ng-qrcode';  // Importa el módulo correcto

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoQrPageRoutingModule,
    QrCodeModule,  // Asegúrate de que esté importado aquí
  ],
  declarations: [CodigoQrPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Agrega esta línea para permitir elementos personalizados
})
export class CodigoQrPageModule {}
