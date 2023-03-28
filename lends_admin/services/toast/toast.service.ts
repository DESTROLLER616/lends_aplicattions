import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async ToastNoAccess(message: string, icon: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      icon: icon
    });

    await toast.present();
  }
}
