import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IMenuState } from "./menu-store.model";

export const menuSelector = createFeatureSelector<IMenuState>('user');

export const userDisplaySelector = createSelector(
  menuSelector,
  (state: IMenuState) => state
)
