import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { ICart } from 'src/app/models/cart.model';
import { AlertsService } from 'src/app/service/alerts.service';
import { appSetSlogan } from 'src/app/store/app.actions';
import { ICartState } from '../../store/cart-store.model';
import { deleteAllFromCart, deleteItemFromCart } from '../../store/cart.actions';
import { cartSelector } from '../../store/cart.selector';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  //Esta variable contedrá todo lo que tiene el store
  cartItems$!: Observable<ICartState>;

  //Varaible control
  status: string = '';

  constructor(
    //Inyeccion para trabajar con mi store/redux
    private store : Store,

    //Inyección de las alertas
    private sweetAlert : AlertsService,

    //Inyectamos el store del carrito
    private cartStore : Store<ICartState>
  ) { }

  //Variable subscripcion
  private subcription = new Subscription;

  //Variable auxilair
  allMoviesInCart : ICart[] = [];

  //Variabe contable
  totalToPay : number = 0;

  ngOnInit(): void {
    //Despachamos la accion del store
    this.store.dispatch(
      appSetSlogan({slogan: 'Masterpices chosen by you to enrich your emotional, moral and historical skills and knowledge'})
      );

    //Esto de acá agarra todo lo que tiene el store
    this.cartItems$ = this.store.pipe(
      select(cartSelector),
      tap(data => console.log(data))
    );

    //Traemos todas las pelis que están en el estado del carrito
    this.cartItems$.subscribe(res => {
      console.log(res.cartItems);
      this.allMoviesInCart = res.cartItems;
      this.status = res.status;

      console.log(this.status);
    });

    //Suma
    this.allMoviesInCart.forEach(m => {
      this.totalToPay += m.price;
    });

    console.log(this.cartItems$);

  }

  //Metodo para borrar de la API
  deleteMovies(id : string) {

    //eliminamos usando el metodo de
    this.cartStore.dispatch(deleteItemFromCart({itemID: id}));

    //Renderizacion de pagina
    let index = this.allMoviesInCart.findIndex(m => m.imdbID == id);

    //restamos el importe
    this.totalToPay -= this.allMoviesInCart[index].price;

    //Eliminamos visualmente del front inmediato
    this.allMoviesInCart.splice(index, 1);
  };

  //Función que elimina todo del carrito
  deleteAll(){

    //Eliminamos todas las peliculas
    this.cartStore.dispatch(deleteAllFromCart());

    //Alerta e que todo salió ok
    this.subcription.add(this.sweetAlert.goodAlert('Success','Your cart has been emptied'));

    //Vaciamos el carrito en el front
    this.allMoviesInCart = [];

    //Reestablecemos el valor
    this.totalToPay = 0;
  };

  //Nos desuscribimos al salir del componente
  ngOnDestroy(): void {
      this.subcription.unsubscribe();
  }
}
