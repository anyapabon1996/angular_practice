import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class ProtectedGuardGuard implements CanActivate {

  constructor(
    private loginService : LoginService,
    private router : Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isUserLoggedIn = this.loginService.isUserLoggedIn();

    //Si el usuario es falso, me lo redirige a la pagina de login
    if (!isUserLoggedIn) {
      this.router.navigate(['login']);
    }

    return isUserLoggedIn;
  }




}
