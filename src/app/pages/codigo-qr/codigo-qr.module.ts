import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoPageRoutingModule } from './codigo-qr-routing.module';

import { CodigoPage } from './codigo-qr.page';

//para generar qr/?
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoPageRoutingModule,
    QrCodeModule
  ],
  declarations: [CodigoPage]
})
export class CodigoPageModule {}
