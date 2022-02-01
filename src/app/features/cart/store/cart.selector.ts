import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICartState } from "./cart-store.model";

//nos da del store, la parte de cart
export const cartStateSelector = createFeatureSelector<ICartState>('cart');

export const cartSelector = createSelector(
  cartStateSelector,

  //Retorno directamente el array de items que tengo.
  (state : ICartState) => state
)
