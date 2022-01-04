import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICart } from 'src/app/models/cart.model';
import { IMovie, IOnlyMovie } from 'src/app/models/movie.model';
import { CartService } from 'src/app/service/cart.service';
import { InfoService } from 'src/app/service/info.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit , OnDestroy{

  constructor(
    //servicio propio de angular. Para retomar la ruta
    private activatedRouter : ActivatedRoute,

    //Inyeccion del servicio
    private infoService : InfoService,

    //Inyecion del servicio carrito
    private cartService : CartService,
  ) { }

  //Variable suscripcion
  private subscription : Subscription | undefined;

  //Variable a recibir la movie del click
  movie! : IOnlyMovie;

  //Variable auxiliar
  movieToCart : ICart = {
    id : '',
    title : '',
    url : '',
    price : 0,
    imdbID : ''
  }

  ngOnInit(): void {

    //Pasamos la peli del evento click
    this.subscription = this.infoService.getMovieById(this.activatedRouter.snapshot.params['id']).
      subscribe(movies => {
          if (movies != undefined){
            this.movie = movies;
            console.log(this.movie);
          }
          else alert ("This movie doesn't exits")
        });
  }

  addToCart(){

    console.log(this.movieToCart);

    this.movieToCart.title = this.movie.Title;
    this.movieToCart.url = this.movie.Poster;
    this.movieToCart.price = 500;
    this.movieToCart.imdbID = this.movie.imdbID;

    //Si le agregamos la suscripcion, NO SE EJECUTA
    // this.subscription?.add(
      this.cartService.postMovieInCar(this.movieToCart).subscribe(data => console.log(data))
    // );
  };

  //Desuscripcion al salir del componente
  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

}
