import { Action, createReducer, on } from "@ngrx/store";
import { IAppState } from "./app-store.model";
import { appSetSlogan } from "./app.actions";

//Estado inicial de aplicacion
export const sloganInitialState: IAppState = {slogan: 'Here it is the Movies Anya slogan'};

//Funcion para ir cambiando el slogan, del viejo a al nuevo
const _appReducer = createReducer(
  //estado inicial
  sloganInitialState,

  //reescribimos el estado inical, es es la Aaction
  on(appSetSlogan, (state, {slogan}) => {
    return {...state,
      slogan: slogan}
  })
);

//Para poder usar la funcion en el modulo
export function appReducer(state: any, action: Action){
  return _appReducer(state, action)
}


