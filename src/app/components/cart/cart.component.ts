import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  constructor(
    //Inyeccion del servicio cart
    private cartService : CartService,
  ) { }

  //Variable subscripcion
  private subcription = new Subscription;

  //Variable auxilair
  allMoviesInCart : ICart[] = [];

  //Variabe contable
  totalToPay : number = 0;

  ngOnInit(): void {

    //Suscribimos eventos
    this.subcription.add(this.cartService.getCartMovies().subscribe(data => {

      //Pasamos todas las pelis guardada en la API al carrito
      this.allMoviesInCart = data;

      //Suma
      this.allMoviesInCart.forEach(m => {
        this.totalToPay += m.price;
      });

      console.log(this.allMoviesInCart);
    }))
  }

  //Metodo para borrar de la API
  deleteMovies(id : string) {

    console.log('El ID: ' + id);

    this.subcription.add(
      this.cartService.deleteMovie(id).subscribe(data => console.log(data))
      );

      //Renderizacion de pagina
      let index = this.allMoviesInCart.findIndex(m => m.imdbID == id);

      //restamos el importe
      this.totalToPay -= this.allMoviesInCart[index].price;

      //Eliminamos visualmente del front inmediato
      this.allMoviesInCart.splice(index, 1);
  };

  //Función que elimina todo del carrito
  deleteAll(){

    //Llamamos al servicio
    this.allMoviesInCart.forEach(movie =>{
      this.subcription.add(this.cartService.deleteMovie(movie.imdbID).subscribe(
        movieEliminated => {
          console.log(movieEliminated + " has been eliminated");
        }
      ))
    });

    alert('Your cart has been emptied')

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
