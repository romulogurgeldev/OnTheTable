import { LoginService } from './../services/login/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: LoginService) {   }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = window.localStorage.getItem('token');
    /**
     *
     */
  
    if(this.accountService.isUserLoggedIn()){
      this.router.navigate(['home']);
      return false;

    }
    else{
      return true;

    }
    
  }
}
