import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login } from 'src/models/login.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private http: HttpClient) { }

  authenticated(login: Login){
    return this.http.post(environment.login_url, login)
  }
}
