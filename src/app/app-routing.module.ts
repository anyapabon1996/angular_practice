import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { InfoComponent } from './components/info/info.component';
import { MoviesComponent } from './components/movies/movies.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
{
  path: 'infoMovie/:id',
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
