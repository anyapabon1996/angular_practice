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
import { LoginComponent } from './components/login/login.component';
import { MostViewComponent } from './components/most-view/most-view.component';
import { IntereptorService } from './interceptors/intereptor.service';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    MoviesComponent,
    MenuComponent,
    InfoComponent,
    LoginComponent,
    MostViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({ app: appReducer } , {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
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
