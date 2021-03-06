import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertsService } from '../service/alerts.service';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class ProtectedGuardGuard implements CanActivate {

  constructor(
    private loginService : LoginService,
    private router : Router,
    private sweetAlert : AlertsService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isUserLoggedIn = this.loginService.isUserLoggedIn();
    const userInfo = this.loginService.getUserInfo();

    //Si el usuario es falso, me lo redirige a la pagina de login
    if (!isUserLoggedIn) {
      this.sweetAlert.warningAlert('Sorry', 'You have to login first');
      this.router.navigate(['login']);
    //Si el usuario es distinto de user
    } else if (userInfo.role !== 'user') {
      this.sweetAlert.warningAlert('Sorry', 'You have to login first');
      this.router.navigate(['login']);
    }

    return isUserLoggedIn;
  }




}
