import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.httpCliente.get<IMostViewMovies[]>(this.url);
  }

}
