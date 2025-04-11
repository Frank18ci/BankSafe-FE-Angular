import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import TipoTarjeta from '../../model/TipoTarjeta';
import { catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoTarjetaService {
  private http = inject(HttpClient);
	url = "http://localhost:8080";
  constructor() { }
  //CRUD
  list(){
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
