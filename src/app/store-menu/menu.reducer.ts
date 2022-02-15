import { Action, createReducer, on } from '@ngrx/store';
import { IMenuState } from './menu-store.model';
import { setRole, removeRole } from './menu.actions';

export const menuInitialState: IMenuState = { role: "" }


const _menuReducer = createReducer(
  menuInitialState,
  on(setRole, (state, { role }) => {
    return {
      ...state,
      role: role
    };
  }),

  on(removeRole, () => ({
    ...menuInitialState
  }))

);

export function menuReducer(state: any, action: any) {
  return _menuReducer(state, action);
}
