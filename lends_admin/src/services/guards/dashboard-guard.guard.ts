import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.hasToken()) return true

    this.presentAlert()
    this.router.navigate(['home'])
    return false

  }

  constructor(private router: Router, private cookieService: CookieService, private alertController: AlertController){}
  
  hasToken(): boolean{
    if(this.cookieService.get('token')) return true

    return false
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'You do not have permittions',
      message: 'You must be logged to be here',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
