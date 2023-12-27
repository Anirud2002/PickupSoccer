import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable, catchError, lastValueFrom, of } from 'rxjs';
import { Login, User, Register } from './auth.modal';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  private userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  user$: Observable<User> = this.userSubject.asObservable();
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
    const apiCall = this.http.post<User>(`${this.baseApiUrl}/user/login`, login)
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
    
    this.setUser(response);
    this.router.navigateByUrl("home");
    return response;
  }

  async setUser(user: User) {
    // set the user using Capacitor Preferences
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(user)
    })

    // set user
    this.user = user;

    // update the observable
    this.userSubject.next(user);
  }

  async getToken(): Promise<string> {
    return (await Preferences.get({key: "token"})).value;
  }
}
