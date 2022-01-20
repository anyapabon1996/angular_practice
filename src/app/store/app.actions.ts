//ACCIONES DE LA APLICACION EN GENERAL
import { createAction, props } from "@ngrx/store";

//Accion para establecer el slogan de la pagina
export const appSetSlogan = createAction(
  'Application set slogan',
  props<{ slogan: string }>()
);
