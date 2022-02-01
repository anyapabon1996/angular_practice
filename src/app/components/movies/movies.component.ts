import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IMovies } from 'src/app/models/movie.model';
import { AlertsService } from 'src/app/service/alerts.service';
import { MetaService } from 'src/app/service/meta.service';
import { MoviesService } from 'src/app/service/movies.service';
import { appSetSlogan } from 'src/app/store/app.actions';

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

    //Store
    private store: Store,

    //Alertas
    private sweetAlert : AlertsService,

    //Inyeccion del servicio para actualizar metas
    private metaService: MetaService,

  ) { }

  //Variable auxiliar
  allMovies : IMovies[] = [];

  //Variable suscripcion
  private subscription = new Subscription;

  //formulario para buscar pelicula
  lookMovieForm = new FormGroup ({
    movieName : new FormControl('')
  })

  ngOnInit(): void {
    //Slogan
    this.store.dispatch(
      appSetSlogan({slogan: 'But you know, a movie is not just about to watch, but to feel another reality that impact your own life'})
    );

    //Pasamos todas las pelis de la API
    for(let i = 1; i<9; i++){

      this.subscription.add(this.movieService.getMovies(i).subscribe(data => {

        //les metemos todas las peliculas de la api
        this.allMovies = this.allMovies.concat(data.Search);

        //Sacamos las peliculas cuyo poster no sea visible
        this.allMovies = this.allMovies.filter(movie => (movie.Poster != 'N/A') && (movie.Type == 'movie'));

        //Ordenamos el array en orden descendente según fecha de lanzamiento
        this.allMovies.sort((a,b) => {
          if ((Number(a.Year)) < (Number(b.Year))) return 1;
          else if ((Number(a.Year)) > (Number(b.Year))) return -1
          else return 0
        });

      }, (err => {
          this.subscription.add(this.sweetAlert.alert('Error!', 'Theres an ERROR!!!'));
      })));
    };

    this.metaService.updateTitle();
  };

    //Funcion que devuelve el objeto de la pelicula buscada
  lookMovie(){
    this.subscription.add(this.movieService.getMovieByTitle(this.lookMovieForm.controls['movieName'].value).subscribe(
      data => {
        if (data != undefined) {
          this.router.navigate(['infoMovie', data]);
        }
        else this.subscription.add(this.sweetAlert.warningAlert('Hey!', 'This movie is not into out DataBases, or you are typing it wrong'));
      }
    ));
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
