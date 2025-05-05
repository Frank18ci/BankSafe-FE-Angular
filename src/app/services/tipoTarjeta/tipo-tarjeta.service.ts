import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import TipoTarjeta from '../../model/TipoTarjeta';
import { catchError, Observable, of, throwError } from 'rxjs';
import { enviroments } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class TipoTarjetaService {
  private http = inject(HttpClient);
	url = enviroments.URLBACKEND;
  constructor() { }
  //CRUD
  list(): Observable<TipoTarjeta[] | null>{
    return this.http.get<TipoTarjeta[]>(this.url + "/tipoTarjeta").pipe(
          catchError(error => {
            if(error.status === 404){
              return of(null);
            }
            return throwError(()=> error);
          })
        )
  }
}
