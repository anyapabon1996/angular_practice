import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    //Inyección del protocolo HTTP
    private httpClient : HttpClient
  ) { }

  //Variable URL
  private url = environment.apiUser + 'register';

  //Variable auxilair
  allUser : IUser[] = [];

  //Manejo de Errores
  private handleError(error: HttpErrorResponse){

    //Error del Front
    if (error.error instanceof ErrorEvent){
      console.warn("Front error", error.error.message);

    //Error del back
    } else {
      console.warn(`Back error: ${error.status}, body error:
      ${error.message}`)
    }

    return throwError(() => new Error('HTTP comunication ERROR Register'));
  }

  //Post de nuevo usuario
  postNewUser(user : IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.url, user);
  }

  //Get de usuario: devuelve true si hay uno igual
  getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.url);
  }

  validateNewUser(user: IUser): Observable<boolean> {

    this.httpClient.get<IUser[]>(this.url).subscribe(data => {
      this.allUser = data;
    });

    //Esta función no agarra. aun cuando coninciden los mails, no toma el indice
    let i = this.allUser.findIndex(email => {
      email.email == user.email
    });

    if (i>-1) return of(true);

    else return of(false);
  }

}
