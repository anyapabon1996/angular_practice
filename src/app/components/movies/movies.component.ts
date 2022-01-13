import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMovies } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit, OnDestroy {

  constructor(
    //Inyectamos el servicio de movies
    private movieService : MoviesService,

    //Inyección del router para ir a otro componente
    private router : Router,

  ) { }

  //Variable auxiliar
  allMovies : IMovies[] = [];

  //Variable suscripcion
  private subscription : Subscription | undefined;

  ngOnInit(): void {
    //Pasamos todas las pelis de la API
    for(let i = 1; i<9; i++){
      this.subscription = this.movieService.getMovies(i).subscribe(data => {

        //les metemos todas las peliculas de la api
        this.allMovies = this.allMovies.concat(data.Search);

        //Ordenamos el array en orden ascendente según fecha de lanzamiento
        this.allMovies.sort((a,b) => {
          if ((Number(a.Year)) > (Number(b.Year))) return 1;
          else if ((Number(a.Year)) < (Number(b.Year))) return -1
          else return 0
        });

      });
    }
  }

  //Redirecciona al componente con la info especifica
  getInfo(id: string){
    this.router.navigate(['infoMovie', id]);
  }

  ngOnDestroy(): void {
    //Desuscripción al salir del componente
    this.subscription?.unsubscribe();
  }

}
