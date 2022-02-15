import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/login/login.component';
import { MostViewComponent } from './components/most-view/most-view.component';
import { MoviesComponent } from './components/movies/movies.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { ProtectedGuardGuard } from './guards/protected-guard.guard';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminRoleGuard],
    loadChildren: () => import('./features/admin/most-view-admin/most-view-admin.module').then(ad => ad.MostViewAdminModule),
    data: {title: 'Admin'}
  },
  {
    path: 'mostViews',
    component: MostViewComponent,
    data: {title: 'Most Viewed'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Login'}
  },
  //No se puede acceder a la informacion de la pelicula a menos que esté logueado
  {
    path: 'infoMovie/:id',
    canActivate: [ProtectedGuardGuard],
    component: InfoComponent,
    data: {title: 'Specific Info'}
  },
  {
    path: 'movie',
    component: MoviesComponent,
    data: {title: 'Movies'}
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {title: 'Register'}
  },
  {
    path: 'cart',
    canActivate: [ProtectedGuardGuard],
    loadChildren: () => import('./features/cart/cart.module').then(car => car.CartModule),
    data: {title: 'Your Cart'}
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
