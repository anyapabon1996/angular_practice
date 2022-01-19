import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  //Titulo de la página
  title: string = 'Movies Anya';

  constructor() { }

  ngOnInit(): void {
  }

}
