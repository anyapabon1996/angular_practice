import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
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
    private sotre : Store<IAppState>
  ) { }

  ngOnInit(): void {
    //Llamamos al selector
    this.slogan$ = this.sotre.pipe(
      select(appSloganSelector)
    )
  }

}
