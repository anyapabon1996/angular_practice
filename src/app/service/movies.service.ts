import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMovie } from '../models/movie.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    //Inyección de httpclient
    private httpClient : HttpClient
  ) { }

  //Variable conexion con API
  //Por elección, quiero que aparezcan las primeras 10 pelis de harry potter
  private firstTenMovies = 'Potter';
  private union = '?s=';
  private url = environment.movieAPIfisrtPart + this.union + this.firstTenMovies + environment.apiKey;
  // +'&page=';
  // &page= --> Esto es para, en todo caso, tomar pelis de otras paginas. Por defecto, toma la 1.

  //Get de peliculas
  getMovies(id: Number): Observable<IMovie> {

    //Antes estabamos usando la linea 23 unida a la 22 para hacer este tipo de peticion, con el metodo de HttpParams funciona igual
    let params = new HttpParams().append('page', String(id));

    return this.httpClient.get<IMovie>(this.url, {params});
  };
}
