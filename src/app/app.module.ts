import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// ======= FIREBASE ============
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

// ** Aquí agregamos ReactiveFormsModule **
import { ReactiveFormsModule } from '@angular/forms';  // <-- IMPORTANTE
// Importación correcta del módulo de QR
import { QrCodeModule } from 'ng-qrcode';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode: 'md' }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    QrCodeModule,
    ReactiveFormsModule // <-- AÑADIDO AQUÍ
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
