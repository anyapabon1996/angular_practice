import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { Observable } from 'rxjs';
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

  postNewUser(user : IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.url, user);
  }
}
