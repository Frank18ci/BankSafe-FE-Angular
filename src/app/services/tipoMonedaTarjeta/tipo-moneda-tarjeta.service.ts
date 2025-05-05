import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import TipoMonedaTarjeta from '../../model/TipoMonedaTarjeta';
import { catchError, Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { enviroments } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class TipoMonedaTarjetaService {
  private http = inject(HttpClient);
	url = enviroments.URLBACKEND;
  constructor() { }
  //CRUD
  list(): Observable<TipoMonedaTarjeta[] | null>{
    return this.http.get<TipoMonedaTarjeta[]>(this.url + "/tipoMonedaTarjeta").pipe(
      catchError(error => {
        if(error.status === 404){
          return of(null);
        }
        return throwError(()=> error);
      })
    )
  }
  listaByTipe(tipo: String): Observable<TipoMonedaTarjeta[]>{
    return this.http.get<TipoMonedaTarjeta[]>(this.url + "/cambioMoneda/" + tipo)
  }
}
