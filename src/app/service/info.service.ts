import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOnlyMovie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(
    //inyeccion del servicio
    private httpCliente : HttpClient,
  ) { }

  //Manejo de Errores
  private handleError(error: HttpErrorResponse){

    //Error del Front
    if (error.error instanceof ErrorEvent){
      console.warn("Error from front", error.error.message);

    //Error del back
    } else {
      console.warn(`Error from back: ${error.status}, error body:
      ${error.message}`)
    }

    return throwError (() => new Error('HTTP comunication error'));

  }

  private union = '?i=';
  private key = environment.apiKey;
  private url = environment.movieAPIfisrtPart;

  getMovieById(id: string): Observable<IOnlyMovie | undefined>{
    return this.httpCliente.get<IOnlyMovie>(this.url + this.union + id + this.key).
     //Esto acá es para cuando se busca una peli que no existe en nuestro sistema
     pipe(catchError(this.handleError));
  }

}
