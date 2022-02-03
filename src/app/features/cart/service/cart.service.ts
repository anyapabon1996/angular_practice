import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { ICart } from 'src/app/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    //Inyeccion del servicio http
    private httpClient : HttpClient,

  ) { }

  //Variable de conexion api
  private url = environment.apiCart + 'cart';

  //Metodo para obtener pelis en el carrito
  getCartMovies(): Observable<ICart[]> {
    return this.httpClient.get<ICart[]>(this.url);
  }

  //Metooo Post: agrega al carrito
  //Le quite el observable : Observable<ICart>
  postMovieInCar(movie : ICart){

    return this.httpClient.post<any>(this.url, movie)
  }

  //Metodo delete: elimina del carrito
  //Le estoy quitando el : Observable<boolean>
  deleteMovie(id : string){
    return this.httpClient.delete<any>(`${this.url}?id=${id}`);
  }

  //Metodo para borrar todo del carrito
  deleteAllMovies(){
    return this.httpClient.delete<any>(`${this.url}/deleteAll`);
  }

}
