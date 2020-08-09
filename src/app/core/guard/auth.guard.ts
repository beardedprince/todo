import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private user: AuthService, private router: Router, private toastr: ToastrService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.user.loggedIn()) {
      return true;
    } else {
      this.toastr.warning('You dont have permission to view this page, kindly login')
      // window.alert('You dont have permission to view this page, kindly login');
      setTimeout(() => {
        this.router.navigate(['/auth', 'login']);
      }, 2000);
      return false;
    }
  }
}
