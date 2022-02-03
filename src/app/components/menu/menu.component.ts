import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ICartState } from 'src/app/features/cart/store/cart-store.model';
import { deleteAllFromCart } from 'src/app/features/cart/store/cart.actions';
import { AlertsService } from 'src/app/service/alerts.service';
import { LoginService } from 'src/app/service/login.service';
import { IAppState } from 'src/app/store/app-store.model';
import { appSloganSelector } from 'src/app/store/app.selector';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  //Titulo de la página
  title: string = 'Movies Anya';

  //solgan de la pagina como observable
  slogan$: Observable<string> = of('');

  constructor(
    //inyeccion del store, especificandole que el tipo de store corresponde a un estado especial
    private store : Store<IAppState>,

    //Inyeccion del servicio de logig
    private userOut: LoginService,

    //Inyeccion de alertas
    private sweetAlert: AlertsService,

    //Inyectamos el router
    private router: Router,

    //Inyeccion del store de carrito
    private cartSotre: Store<ICartState>
  ) { }

  ngOnInit(): void {
    //Llamamos al selector
    this.slogan$ = this.store.pipe(
      select(appSloganSelector)
    );
  }

  logout(){
    let userInfo = this.userOut.getUserInfo();

    if (userInfo.role != ''){
      //Al loguearse, vaciamos el carrito en su totalidad, de modo que: 1) ya se queden escuchando al sotore, 2) se setee el carrito
      this.cartSotre.dispatch(deleteAllFromCart());

      //Apuntamos el token, usuario, role y username a nulo
      this.userOut.logout();

      //le decimos al usuario que salió exitosamente
      this.sweetAlert.goodAlert('You are out', 'Have a nice day, we will meet again, just come by');

      //Al salirse, es reirigido al login
      this.router.navigate(['login']);
    } else {

      this.sweetAlert.warningAlert('Wrong!', 'You are not login, soy you can not go logout');
    }

  }

}
