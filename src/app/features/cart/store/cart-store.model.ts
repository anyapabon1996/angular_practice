import { ICartItem } from "../cart.model";

//Voy a tener un array de items de objetos de tipo carrito
export interface ICartState {
  cartItems: ICartItem[];
  status: string
}
