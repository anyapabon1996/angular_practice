import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ICart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    //Inyeccion del servicio http
    private httpClient : HttpClient,

  ) { }

  //Variable de conexion api
  private url = environment.apiCart;

  //Metodo para obtener pelis en el carrito
  getCartMovies(): Observable<ICart[]> {
    return this.httpClient.get<ICart[]>(this.url);
  }

  //Metooo Post: agrega al carrito
  postMovieInCar(movie : ICart): Observable<ICart> {

    return this.httpClient.post<ICart>(this.url, movie);
  }

  //Metodo delete: elimina del carrito
  deleteMovie(id : string): Observable<boolean> {

    return this.httpClient.delete<boolean>(`${this.url}?id=${id}`);
  }

  }
