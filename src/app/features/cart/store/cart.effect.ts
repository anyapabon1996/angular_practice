import { ThisReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { ICart } from "src/app/models/cart.model";
import { ICartItem } from "../cart.model";
import { CartService } from "../service/cart.service";
import { addItemToCart, deleteItemFromCart, setCartContent } from "./cart.actions";

@Injectable()
export class CartEffect {

  constructor(
    //Inyectamos el servicio de carrito
    private cartService: CartService,

    //Inyectamos el servicio detodas las acciones que se van generando
    private action: Actions
  ){}

  addItemToCart$ = createEffect( () =>
    this.action.pipe(
      ofType(addItemToCart),
      switchMap(act => this.cartService.postMovieInCar(act.cartContentitem)),
      map(data => setCartContent({cartItems: data.cartContent as ICartItem[]}))
    )
  );

  deleteItemFromCart$ = createEffect(() =>
      this.action.pipe(
        ofType(deleteItemFromCart),
        switchMap(act => this.cartService.deleteMovie(act.itemID)),
        map(data => setCartContent({cartItems: data.cartContent as ICartItem[]}))
      )
  );
}
