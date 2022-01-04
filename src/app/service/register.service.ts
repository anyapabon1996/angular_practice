import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { Observable, of } from 'rxjs';
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
  private url = environment.APIrestURL + 'users';

  //Variable auxilair
  allUser : IUser[] = [];

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
