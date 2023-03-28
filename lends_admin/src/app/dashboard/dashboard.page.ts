import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private alertController: AlertController, private router: Router, private cookieService: CookieService) { }

  exit = false

  ngOnInit() {
  }

  public pages = [
    { path: 'Welcome', url: '', icon: 'home' },
    { path: 'category', url: 'category', icon: 'reorder-four' },
    { path: 'sections', url: 'sections', icon: 'albums' },
    //{ path: 'photos', url: 'photos', icon: 'images' }
  ]

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure to want to exit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Exit',
          role: 'confirm',
          handler: () => {
            // this.cookieService.delete('token')
            // this.cookieService.delete('id')
            // this.cookieService.delete('name')
            // this.cookieService.delete('email')
            // this.cookieService.delete('telephone')
            this.cookieService.deleteAll()
            this.router.navigate([''])
          },
        },
      ],
    });

    await alert.present();
  }

  async logout(){

    await this.presentAlert()

    // if(this.exit){
    //    return console.log('saliendo');
    // }

    // return console.log('aqui');

  }

}
