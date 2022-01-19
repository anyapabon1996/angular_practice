import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {

  constructor(
    private loginService : LoginService,
    private router : Router,
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //Devuelve booleano
    const userInfo = this.loginService.getUserInfo();

    console.log(userInfo);

    //Si el usuario es falso, me lo redirige a la pagina de login
    if (userInfo.role !== 'admin') {
      alert('This side is only for admin member')
      this.router.navigate(['login']);
    }

    return true;
  }

}
