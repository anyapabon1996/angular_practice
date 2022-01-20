import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { InfoComponent } from './components/info/info.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { MostViewComponent } from './components/most-view/most-view.component';
import { MostViewAdminComponent } from './components/most-view-admin/most-view-admin.component';
import { IntereptorService } from './interceptors/intereptor.service';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer'


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    MoviesComponent,
    MenuComponent,
    InfoComponent,
    CartComponent,
    LoginComponent,
    MostViewComponent,
    MostViewAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot({ app: appReducer } , {}),
  ],
  providers: [
    //Esto alude al servicio del interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IntereptorService,
      multi: true //hace que esté pendiente de todos los cambios que hagamos.
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
