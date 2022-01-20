import { state } from "@angular/animations";
import { createSelector } from "@ngrx/store";
import { IAppState } from "./app-store.model";

//Devuelve todo el estado
export const appSelector = (state: any) => state.app;

//Seleccion del estado que quiero obtener
export const appSloganSelector = createSelector(
  appSelector,
  (state: IAppState) => state.slogan
);
