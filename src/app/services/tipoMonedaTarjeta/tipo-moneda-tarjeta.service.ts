import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import TipoMonedaTarjeta from '../../model/TipoMonedaTarjeta';
import { catchError, Observable, throwError } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoMonedaTarjetaService {
  private http = inject(HttpClient);
	url = "http://localhost:8080";
  constructor() { }
  //CRUD
  list(): Observable<any>{
    return this.http.get<TipoMonedaTarjeta[]>(this.url + "/tipoMonedaTarjeta").pipe(
      catchError(error => {
        if(error.status === 404){
          return of(null);
        }
        return throwError(()=> error);
      })
    )
  }
  listaByTipe(tipo: String): Observable<any>{
    return this.http.get<TipoMonedaTarjeta[]>(this.url + "/cambioMoneda/" + tipo)
  }
}
