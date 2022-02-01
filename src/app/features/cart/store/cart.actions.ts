import { createAction, props } from "@ngrx/store";
import { ICart } from "src/app/models/cart.model";
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

export const setCartContent = createAction(
  'Cart - Set Cart Content',
  props<{cartItems: ICartItem[]}>()
);

//elimina todo. No hace falta un props porque no recibe ningún parámetro. Me parece q yo no lo uso porque elimino de a una por una
// export const deleteAll = createAction(
//   'Cart - Clear all'
// );
