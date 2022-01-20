import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ICart } from 'src/app/models/cart.model';
import { IMostViewMovies } from 'src/app/models/mostView.model';
import { CartService } from 'src/app/service/cart.service';
import { MostViewService } from 'src/app/service/most-view.service';
import { appSetSlogan } from 'src/app/store/app.actions';

@Component({
  selector: 'app-most-view',
  templateUrl: './most-view.component.html',
  styleUrls: ['./most-view.component.scss']
})
export class MostViewComponent implements OnInit, OnDestroy {

  //Variable contenedora
  allMovies : IMostViewMovies[] = [];

  //Variable contenedoras de pelis en el carrito
  allMoviesInCart : ICart[] = [];

  //Variable auxiliar
  movieToCart : ICart = {
  id : '',
  title : '',
  url : '',
  price : 0,
  imdbID : '',
  exists: false
}

  //Variable suscripcion
  private subscription = new Subscription;

  constructor(
    //Inyeccion del servicio
    private mostViewService : MostViewService,

    private cartService : CartService,

    //Inyeccion del store
    private store: Store,
  ) { }

  ngOnInit(): void {
    //Pasamos el slogan
    this.store.dispatch(
      appSetSlogan({slogan: "Look carefully. Just because they are here, doesn't mean they are good, just profitable"})
    )

    //Le pasamos todas las peliculas que tenemos al array de pelis
    this.subscription.add(this.mostViewService.getMovies().subscribe(movies => {
      this.allMovies = movies;
      console.log(this.allMovies);
    }, (err) => {
      alert('There is an error at mostViewComponent');
    }));

    this.subscription.add(this.cartService.getCartMovies().subscribe(data => {
      this.allMoviesInCart = data;
      console.log(this.allMoviesInCart);
    }))
  };

  //Agregar al carrito
  addToCart(id: string) {

    //verificamos que la pelicula no exista
    let index = this.allMoviesInCart.findIndex(movie => movie.imdbID == id);

    //si no existe dentro del carrito, la agregamos
    if (index == -1) {

      index = this.allMovies.findIndex(movie => movie.id == id);

      this.movieToCart.imdbID = id;
      this.movieToCart.price = 500;
      this.movieToCart.title = this.allMovies[index].title;
      this.movieToCart.url = this.allMovies[index].image;

      this.subscription.add(this.cartService.postMovieInCar(this.movieToCart).subscribe(data => {
        alert('Movie aded to cart');
      }));

      this.allMoviesInCart.push(this.movieToCart);

    //si existe dentro del carrito, lanzamos el mensaje de error
    } else {
      alert('This movie already exist');
    }
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
