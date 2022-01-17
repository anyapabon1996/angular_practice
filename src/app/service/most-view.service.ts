import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMostViewMovies } from '../models/mostView.model';

@Injectable({
  providedIn: 'root'
})
export class MostViewService {

  //Variable conexion con la API
  private url = environment.APIrestURL + 'movies';

  constructor(
    //inyeccion de servicio
    private httpCliente : HttpClient,
  ) { }

  //Metodo que llama a todas las peliculas GET
  getMovies(): Observable<IMostViewMovies[]> {

    //Pasamos por parametro el headers, que es el token
    return this.httpCliente.get<IMostViewMovies[]>(this.url);
  }

}
