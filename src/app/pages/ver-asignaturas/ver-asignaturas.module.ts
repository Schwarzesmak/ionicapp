import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VerAsignaturasPageRoutingModule } from './ver-asignaturas-routing.module';
import { VerAsignaturasPage } from './ver-asignaturas.page';
import { QrCodeModule } from 'ng-qrcode';
import { ModalMessageComponent } from '../../shared/components/modal-message/modal-message.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerAsignaturasPageRoutingModule,
    QrCodeModule,
  ],
  declarations: [VerAsignaturasPage, ModalMessageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Esto puede ayudar con componentes no reconocidos
})
export class VerAsignaturasPageModule {}
