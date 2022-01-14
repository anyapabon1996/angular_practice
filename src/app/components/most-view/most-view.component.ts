import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMostViewMovies } from 'src/app/models/mostView.model';
import { MostViewService } from 'src/app/service/most-view.service';

@Component({
  selector: 'app-most-view',
  templateUrl: './most-view.component.html',
  styleUrls: ['./most-view.component.scss']
})
export class MostViewComponent implements OnInit {

  //Variable contenedora
  allMovies : IMostViewMovies[] = [];

  //Variable suscripcion
  private subscription = new Subscription;

  constructor(
    //Inyeccion del servicio
    private mostViewService : MostViewService,
  ) { }

  ngOnInit(): void {
    //Le pasamos todas las peliculas que tenemos al array de pelis
    this.subscription.add(this.mostViewService.getMovies().subscribe(movies => {
      this.allMovies = movies;
      console.log(this.allMovies);
    }))
  }

}
