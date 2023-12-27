import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, take, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/auth.modal';
import { Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser: User;
    this.authService.user$.pipe(take(1)).subscribe(user => currentUser = user);

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        switch(error.status){
          case 401: // unauthorized
            this.router.navigateByUrl("login");
            this.toastService.createErrorToast("Unauthorized!");
            break;
          case 500: // backend error
            this.toastService.createErrorToast("Something went wrong!");
            break;
          default:
            this.toastService.createErrorToast(error.error.message);
            break;
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
