import { Action, createReducer, on } from "@ngrx/store";
import { ICartState } from "./cart-store.model";
import { addItemToCart, deleteItemFromCart, setCartContent } from "./cart.actions"

//El estado inicial es un array vacio
export const cartIitialState: ICartState = {cartItems: []};

const _cartReducer = createReducer(
  cartIitialState,

  // on(addItemToCart, (state, {item}) => {
  //   console.log('si, vas bien');
  //   const items = [...state.cartItems];
  //   console.log(item.title);
  //   items.push(item);

  //   return {
  //     ...state,
  //     items
  //   };
  // }),

  // on(deleteItemFromCart, (state, {itemID}) => {
  //   const items = [...state.cartItems];
  //   const itemIndex = items.findIndex(it => it.imdbID == itemID);

  //   items.splice(itemIndex,1);

  //   console.log('despues de eliminar' + items);


  //   return {
  //     ...state,
  //     items
  //   };
  // }),

  on(setCartContent, (state, { cartItems }) => {
    return {
      ...state,
      cartItems
    }
  })
);

//exportamos la funcion que se importa en el cartmodule
export function cartReducer(state: any, action: Action){
  return _cartReducer(state, action)
};
