import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class IntereptorService implements HttpInterceptor {

  constructor(
    private loginService: LoginService,
  ) { }

  //este es el metodo interceptor que va entre el request y la API, para obtene el token
  //request: HttpRequest<any> ->resuelve cualquier cosa, por eso lo mantiene como any
  //next: HttpHandler -> siguiente a paso a realizar despues de terminar el intercept
  // Observable<HttpEvent<any>> -> Observable que resuelve un evento htpp que resuelve cualquier cosa
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add auth header with jwt if account is logged in and request is to the api url
      const token = this.loginService.getToken();

      // const isApiUrl = request.url.startsWith(environment.APIrestURL);
      const isApiUrl2 = request.url.startsWith(environment.apiCart);
      // const isApiUrl3 = request.url.startsWith(environment.movieAPIfisrtPart);

      if (token && isApiUrl2) {
        //Esto clona la request, de modo que podamos hacer uso de ella las veces que sea necesaria. Si no, al primer
        //uso dejaría de ser funcional
          request = request.clone({
            //Esto acá es como se me va a mostrar en red
              setHeaders: { Authorization: `Bearer ${token}` },
          });

          console.log(request);
      };

      //Esto es: deje pasar todo
      return next.handle(request)
      .pipe(
        catchError(this.handleError)
      );
  }

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

    return throwError(() => 'HTTP comunication ERROR');
  }
}
