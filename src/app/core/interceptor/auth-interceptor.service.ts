import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import {AuthService} from 'core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  intercept(req, next) {
    const api = this.injector.get(AuthService);
    const authRequest = req.clone({
      headers: req.headers.set('auth-token', api.token)
    });
    return next.handle(authRequest);
  }
}
