import { Action, createReducer, on } from "@ngrx/store";
import { ICartState } from "./cart-store.model";
import { addItemToCart, deleteItemFromCart, setCartContent } from "./cart.actions"

//El estado inicial es un array vacio
export const cartIitialState: ICartState = {status: '', cartItems: []};

const _cartReducer = createReducer(
  cartIitialState,

  on(setCartContent, (state, {status, cartItems }) => {
    return {
      ...state,
      cartItems,
      status
    }
  })
);

//exportamos la funcion que se importa en el cartmodule
export function cartReducer(state: any, action: Action){
  return _cartReducer(state, action)
};
