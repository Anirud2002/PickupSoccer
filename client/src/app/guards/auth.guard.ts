import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
    ){}
  async canLoad(): Promise<boolean> {
    if(await this.authService.isAuthenticated()) {
      return true;
    }else {
      this.router.navigateByUrl("login");
      return false;
    }
  }
}
