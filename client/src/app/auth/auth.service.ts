import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { catchError, lastValueFrom, of } from 'rxjs';
import { Login, Register } from './auth.modal';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApiUrl: string = "http://localhost:3000";
  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private router: Router
  ) { }

  async register(register: Register) {
    const apiCall = this.http.post(`${this.baseApiUrl}/user/register`, register)
    .pipe(
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );

    const response = await lastValueFrom(apiCall);

    if(!response) {
      // TODO: Handle the error
      return null;
    }

    const toast = await this.toastController.create({
      duration: 2000,
      color: "success",
      message: "Registration Successful!"
    });
    await toast.present();

    // navigate to login page
    this.router.navigateByUrl("/login")
    return response;
  }

  async login(login: Login) {
    const apiCall = this.http.post(`${this.baseApiUrl}/user/login`, login)
    .pipe(
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );

    const response = await lastValueFrom(apiCall);

    if(!response) {
      // TODO: Handle the error
      return null;
    }
    
    console.log(response);
    return response;
  }
}
