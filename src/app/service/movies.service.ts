import { HttpClient } from '@angular/common/http';
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
  private firstTenMovies = 'Harry Potter';
  private union = '?s=';
  private url = environment.movieAPIfisrtPart + this.union + this.firstTenMovies + environment.apiKey;
  // &page= --> Esto es para, en todo caso, tomar pelis de otras paginas. Por defecto, toma la 1.

  //Get de peliculas
  getMovies(): Observable<IMovie> {
    return this.httpClient.get<IMovie>(this.url);
  };
}
