import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMostViewMovies } from '../models/mostView.model';

@Injectable({
  providedIn: 'root'
})
export class MostViewAdminService {

  //variable conexion con la API
  private url = environment.APIrestURL + 'movies';

  constructor(
    //Inyeccion del servicio
    private httpCliente : HttpClient,
  ) { }

  //edita una pelicula
  updateMovies(movie: IMostViewMovies): Observable<IMostViewMovies> {
    return this.httpCliente.put<IMostViewMovies>(this.url+ '/' + movie.id, movie);
  }

  //Postea una pelicula
  addMovie(movie: IMostViewMovies): Observable<IMostViewMovies> {
    return this.httpCliente.post<IMostViewMovies>(this.url, movie);
  }

  //Elimina la pelicula
  deleteMovie(id: string): Observable<boolean> {
    return this.httpCliente.delete<boolean>(`${this.url}/${id}`)
  }
}
