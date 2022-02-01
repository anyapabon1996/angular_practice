import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
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
    private sotre : Store<IAppState>,

    //Inyeccion del servicio de logig
    private userOut: LoginService,

    //Inyeccion de alertas
    private sweetAlert: AlertsService,
  ) { }

  ngOnInit(): void {
    //Llamamos al selector
    this.slogan$ = this.sotre.pipe(
      select(appSloganSelector)
    );
  }

  logout(){
    let userInfo = this.userOut.getUserInfo();

    if (userInfo.role != ''){

      //Apuntamos el token, usuario, role y username a nulo
      this.userOut.logout();

      //le decimos al usuario que salió exitosamente
      this.sweetAlert.goodAlert('You are out', 'Have a nice day, we will meet again, just come by');

    } else {

      this.sweetAlert.warningAlert('Wrong!', 'You are not login, soy you can not go logout');
    }

  }

}
