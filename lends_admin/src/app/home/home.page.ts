import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogService } from 'src/services/log.service';

import { CookieService } from 'ngx-cookie-service';
import { ToastController } from '@ionic/angular';
import { ToastService } from 'src/services/toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private fb: FormBuilder, private loginService: LogService, private router: Router, private cookieService: CookieService, private toastController: ToastController, private toastService: ToastService) {}

  ngOnInit(){
    if(this.isAuthenticated()) this.router.navigate(['dashboard'])
  }

  get email(){
    return this.formUser.get('email') as FormControl
  }

  get password(){
    return this.formUser.get('password') as FormControl
  }

  get strategy() {
    return this.formUser.get('strategy') as FormControl
  }

  formUser = this.fb.group({
    'email': ['', [Validators.email, Validators.required]],
    'password': ['', [Validators.minLength(8)]],
    'strategy': ['local'],
  })

  async ToastNoAccess(message: string, icon: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      icon: icon
    });

    await toast.present();
  }

  login(){
    this.loginService.authenticated(this.formUser.value).subscribe( (res:any) => {
      const {user, accessToken} = res
      console.log(user)
      console.log(accessToken);

      this.cookieService.set('token', accessToken)
      this.cookieService.set('id', user._id)
      this.cookieService.set('name', user.fullname)
      this.cookieService.set('email', user.email)
      this.cookieService.set('telephone', user.telephone)
      

      console.log('logged');

      this.router.navigate(['dashboard'])
      
    },
    (err) => {
      const {error} = err
      let icon: string

      console.log(error.name);

      if(error.name ==  undefined){
        error.name = 'No internet connection'
        icon = 'wifi'
      } else {
        error.name = 'Email or password not correct'
        icon = 'close-circle'
      }
      
      this.toastService.ToastNoAccess(error.name, icon)
    })
  }

  isAuthenticated(): boolean{
    if(this.cookieService.get('token')) return true

    return false
  }
}
