import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {

  async isOnline(): Promise<boolean> {
    const status = await Network.getStatus();
    return status.connected;
  }

  constructor() {
    // Detectar el cambio de estado de la conexión
    Network.addListener('networkStatusChange', (status) => {
      console.log('Network status changed', status);
    });
  }
}
