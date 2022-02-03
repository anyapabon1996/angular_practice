import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ICartItem } from 'src/app/features/cart/cart.model';
import { CartService } from 'src/app/features/cart/service/cart.service';
import { ICartState } from 'src/app/features/cart/store/cart-store.model';
import { addItemToCart } from 'src/app/features/cart/store/cart.actions';
import { ICart } from 'src/app/models/cart.model';
import { IMostViewMovies } from 'src/app/models/mostView.model';
import { AlertsService } from 'src/app/service/alerts.service';
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

  //Variable suscripcion
  private subscription = new Subscription;

  constructor(
    //Inyeccion del servicio
    private mostViewService : MostViewService,

    private cartService : CartService,

    //Inyeccion del store
    private store: Store,

    //Inyeccion de alertas
    private sweetAlert : AlertsService,

    //Inyectamos lo que sería el store de carrito
    private cartStore : Store<ICartState>,
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
      this.subscription.add(this.sweetAlert.alert('Error!', 'There is an error at mostViewComponent'));
    }));

    this.subscription.add(this.cartService.getCartMovies().subscribe(data => {
      this.allMoviesInCart = data;
      console.log(this.allMoviesInCart);
    }))
  };

  //Agregar al carrito
  addToCart(id: string) {

    //Variable auxiliar
    let movieToCart : ICart = {
      id : '',
      title : '',
      url : '',
      price : 0,
      imdbID : '',
      exists: false
    }

    console.log('id: ' + id);

    //verificamos que la pelicula no exista
    let index = this.allMoviesInCart.findIndex(movie => movie.imdbID == id);

    console.log(index);

    //si no existe dentro del carrito, la agregamos
    if (index == -1) {

      console.log('entra');

      index = this.allMovies.findIndex(movie => movie.id == id);

      movieToCart.imdbID = id;
      movieToCart.price = 500;
      movieToCart.title = this.allMovies[index].title;
      movieToCart.url = this.allMovies[index].image;

      console.log('entra 1');


      let cartItem: ICartItem = movieToCart;

      //Esto de acá tiene lo que sería item: cartItem, lo tenemos que pasar así, porque en las acciones, nosotros le definimos que va a reibir un item
      this.cartStore.dispatch(addItemToCart({ cartContentitem: cartItem }));

      this.allMoviesInCart.push(movieToCart);

      this.subscription.add(this.sweetAlert.goodAlert('Good choice!', 'Movie aded to cart'));

    //si existe dentro del carrito, lanzamos el mensaje de error
    } else {
      this.subscription.add(this.sweetAlert.warningAlert('Hey!', 'This movie already exists in your cart'));
    }
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
