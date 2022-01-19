import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = environment.apiCart + 'login';
  private token : any = null;
  private user = '';
  private userName = '';
  private role = '';

  constructor(
    //Ingresamos el servicio
    private httpClient : HttpClient,
  ) { }

  //Funcion para validar un usuario que se loguea
  validateCredentials(user: string, password: string): Observable<boolean> {
    return this.httpClient.post<any>(this.url, { user, password })
    .pipe (
      map(response => {
        if (response.status === 'OK') {
          this.token = response.token;
          //Se decodifica el token para despues obtener sus valores como user y userName
          const decodedToken: any = jwt_decode(this.token);
          this.user = decodedToken?.user;
          this.userName = decodedToken?.userName;
          this.role = decodedToken?.role;
          return true;
        } else {
          this.token = null;
          return false;
        }
      })
    )
  }

  //Método para obtener el token
  getToken(): any{
    return this.token;
  }

  //Metodo booleano para determinar si esta logueado el user
  isUserLoggedIn() {
    return this.user !== '';
  }

  //Metodo para obtener la info del user
  getUserInfo(): any {
    return {
      user: this.user,
      userName: this.userName,
      role: this.role
    }
  }


}
