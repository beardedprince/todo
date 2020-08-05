import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path = environment.path;

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(registerForm) {
    return this.http.post(this.path + '/register', registerForm);
  }

  loginUser(loginForm) {
    return this.http.post( this.path + '/login' , loginForm);
  }

  loggedIn() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);

  }
}
