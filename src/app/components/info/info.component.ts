import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/features/cart/service/cart.service';
import { ICartState } from 'src/app/features/cart/store/cart-store.model';
import { addItemToCart } from 'src/app/features/cart/store/cart.actions';
import { ICart } from 'src/app/models/cart.model';
import { IOnlyMovie } from 'src/app/models/movie.model';
import { AlertsService } from 'src/app/service/alerts.service';
import { InfoService } from 'src/app/service/info.service';
import { appSetSlogan } from 'src/app/store/app.actions';
import { ICartItem } from './../../features/cart/cart.model'

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

    //Inyeccion delm servicio de ruteo
    private router : Router,

    //Inyeccion del store
    private store : Store,

    //Inyección de las alertas
    private sweetAlert : AlertsService,

    //Inyectamos lo que sería el store de carrito
    private cartStore : Store<ICartState>,
  ) { }

  //Variable suscripcion
  private subscription = new Subscription;

  //Variable a recibir la movie del click
  movie! : IOnlyMovie;

  //Variable auxiliar
  movieToCart : ICart = {
    id : '',
    title : '',
    url : '',
    price : 0,
    imdbID : '',
    exists: false
  }

  //Variable auxiliar
  allMoviesInCart : ICart[] = [];

  ngOnInit(): void {
    //Pasamos el slogan
    this.store.dispatch(
      appSetSlogan({slogan: "It's from wises to know a little about that you are just about to start. Although sometimes you end up in places never expected"})
    );

    //Pasamos la peli del evento click
    this.subscription.add(this.infoService.getMovieById(this.activatedRouter.snapshot.params['id']).
      subscribe(movies => {

          if (movies != undefined){
            this.movie = movies;
            console.log(this.movie);
          } else {
          this.subscription.add(this.sweetAlert.alert('Error!', 'This movie do not exists'));
          }
      })
    );

    this.cartService.getCartMovies().subscribe(movie => this.allMoviesInCart = movie);
  }

  addToCart(){

    console.log(this.movieToCart);

    this.movieToCart.title = this.movie.Title;
    this.movieToCart.url = this.movie.Poster;
    this.movieToCart.price = 500;
    this.movieToCart.imdbID = this.movie.imdbID;

    const cartItem: ICartItem = this.movieToCart;

    //Esto de acá tiene lo que sería item: cartItem, lo tenemos que pasar así, porque en las acciones, nosotros le definimos que va a reibir un item
    this.cartStore.dispatch(addItemToCart({ cartContentitem: cartItem }));


    //TODO ESTO QUE ESTA ACA, QUE ES PARA TIRAR UN ALERT, NO LO QUIERO HACER!
    //La idea es usar la propiedad exists
    let index = this.allMoviesInCart.findIndex(index => index.imdbID == this.movieToCart.imdbID);

    if (index == -1) {
      this.allMoviesInCart.push(this.movieToCart);
      this.subscription.add(this.sweetAlert.goodAlert('Good!', 'Movie added to cart'));
    }
    else this.subscription.add(this.sweetAlert.warningAlert('Hey!', 'This movie is aleready in your cart'));

  };

  return(){
    this.router.navigate(['movie']);
  }

  //Desuscripcion al salir del componente
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
