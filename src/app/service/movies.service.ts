import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMovie, IOnlyMovie } from '../models/movie.model';
import { map, Observable } from 'rxjs';


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
  private firstTenMovies = 'Harry Potter';
  private union = '?s=';
  private url = environment.movieAPIfisrtPart + this.union + this.firstTenMovies + environment.apiKey;
  private unionTitle = '?t=';

  //Get de peliculas
  getMovies(id: Number): Observable<IMovie> {

    //Antes estabamos usando la linea 23 unida a la 22 para hacer este tipo de peticion, con el metodo de HttpParams funciona igual
    let params = new HttpParams().append('page', String(id));

    return this.httpClient.get<IMovie>(this.url, {params});
  };


  //Metodo para buscar peli por titulo
  getMovieByTitle(title: string): Observable<undefined | string> {
    return this.httpClient.get<any>(environment.movieAPIfisrtPart + this.unionTitle + title + environment.apiKey)
    .pipe(
      map(Response => {
        //Si la respuesta obtenida es falsa, nos devuelve un unedfine
        if(!Response.Response) return undefined;

        //Si la respuesta obtenida es verdadera, nos devuelve su imdbID
        else return Response.imdbID
      })
    );
  }
}
