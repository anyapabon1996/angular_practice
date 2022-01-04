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

  ngOnInit(): void {

    this.subcription = this.cartService.getCartMovies().subscribe(data => {

      //Pasamos todas las pelis guardada en la API al carrito
      this.allMoviesInCart = data;

      console.log(this.allMoviesInCart);
    })

  }

  //Variable suscrpcion
  private subcription : Subscription | undefined;

  //Variable auxilair
  allMoviesInCart : ICart[] = [];

  //Metodo para borrar de la API
  deleteMovies(id : string) {
    // this.subcription?.add(
      this.cartService.deleteMovie(id).subscribe(data => alert(data))
      // );
  }

  //Nos desuscribimos al salir del componente
  ngOnDestroy(): void {
      this.subcription?.unsubscribe();
  }
}
