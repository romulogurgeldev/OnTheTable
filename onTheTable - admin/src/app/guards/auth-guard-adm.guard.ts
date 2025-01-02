import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmGuard implements CanActivate {
  constructor(private router: Router, private accountService: LoginService) {   }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = window.localStorage.getItem('token');
    const category: any =  this.accountService.getInfoUser(token);
    /**
     *
     */

    if(this.accountService.isUserLoggedIn() && category.category!="funcionario"){
      return true;
    }
    else{
      this.router.navigate([`restaurante/${window.localStorage.getItem("idRestaurante")}/pedidos/mesas`]);
      return false;
    }
    
  }
  
}
