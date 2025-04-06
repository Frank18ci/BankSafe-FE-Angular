import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import tipoDocumentoUser from '../../model/TipoDocumentoUser';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoUserService {
  private http = inject(HttpClient);
	url = "http://localhost:8080";
  constructor() { }
  //CRUD
  list(){
    return this.http.get<tipoDocumentoUser[]>(this.url + "/tipoDocumentoUser")
  }
  find(id: number){
    return this.http.get(this.url + `/tipoDocumentoUser/${id}`)
  }
}
