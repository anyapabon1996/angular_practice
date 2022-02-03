import { createAction, props } from "@ngrx/store";
import { ICartItem } from "../cart.model";

//Agrega un elemtno ed topo ICart
export const addItemToCart = createAction(
  'Cart - Add item',
  props<{cartContentitem: ICartItem}>()
);

//Elimina elemenot. Recibe un elemento de tipo string correspondiente al id de la peli a eliminar
export const deleteItemFromCart = createAction(
  'Cart - Delete Item',
  props<{itemID: string}>()
);

//Borra todo del carrito
export const deleteAllFromCart = createAction(
  'Cart - Clear all'
);

//Setea el contenido
export const setCartContent = createAction(
  'Cart - Set Cart Content',
  props<{status: string, cartItems: ICartItem[]}>()
);

