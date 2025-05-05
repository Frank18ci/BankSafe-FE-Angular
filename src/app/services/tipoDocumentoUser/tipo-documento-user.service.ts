import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import tipoDocumentoUser from '../../model/TipoDocumentoUser';
import { catchError, Observable, of, throwError } from 'rxjs';
import { enviroments } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoUserService {
  private http = inject(HttpClient);
	url = enviroments.URLBACKEND;
  constructor() { }
  //CRUD
  list() : Observable<tipoDocumentoUser[] | null>{
    return this.http.get<tipoDocumentoUser[]>(this.url + "/tipoDocumentoUser").pipe(
          catchError(error => {
            if(error.status === 404){
              return of(null);
            }
            return throwError(()=> error);
          })
        )
  }
  find(id: number) : Observable<tipoDocumentoUser>{
    return this.http.get<tipoDocumentoUser>(this.url + `/tipoDocumentoUser/${id}`)
  }
}
