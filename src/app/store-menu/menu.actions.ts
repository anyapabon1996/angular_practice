import { createAction, props } from "@ngrx/store";

//Este de acá establece el rol del usuario
export const setRole = createAction(
  'User - Set role',
  props<{role:string}>()
);

//Este de acá elimina el rol del usuario
export const removeRole = createAction(
  'User - Remove Role',
);
