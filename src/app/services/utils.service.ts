import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router =  inject(Router);


    // ======= LOADING ==========
    loading () {
      return this.loadingCtrl.create({ spinner: 'crescent'})
    }


    // ========= Toast ==========
      async presentToast(opts?: ToastOptions) {
      const toast = await this.toastCtrl.create(opts);
      toast.present();
    }

    // ====== Funcion de routerLinkl

    routerLink(url: string) {
      return this.router.navigateByUrl(url);
    }


    // == Guardar un elemento en LocalStorage
    saveInLocalStorage(key: string, value: any) {
      return localStorage.setItem(key, JSON.stringify(value))
    }

    // === Obtiene un elemento desde Localstorage
    getFromLocalStorage(key: string) {
      return JSON.parse(localStorage.getItem(key))
    }

}
