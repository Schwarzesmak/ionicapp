import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesorIndexPageRoutingModule } from './profesor-index-routing.module';

import { ProfesorIndexPage } from './profesor-index.page';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorIndexPageRoutingModule,
    SharedModule
],
  declarations: [ProfesorIndexPage]
})
export class ProfesorIndexPageModule {}
