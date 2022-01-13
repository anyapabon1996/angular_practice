import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/login/login.component';
import { MoviesComponent } from './components/movies/movies.component';
import { RegisterComponent } from './components/register/register.component';
import { ProtectedGuardGuard } from './guards/protected-guard.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  //No se puede acceder a la informacion de la pelicula a menos que esté logueado
  {
    path: 'infoMovie/:id',
    canActivate: [ProtectedGuardGuard],
    component: InfoComponent
  },
  {
    path: 'movie',
    component: MoviesComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: '',
    redirectTo: 'movie',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }