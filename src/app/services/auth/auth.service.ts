import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import tipoDocumentoUser from '../../model/TipoDocumentoUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  url: string = "http://localhost:8080"

  constructor() { }

  login(user : any){
    return this.http.post(this.url + "/login", user)
  }
  register(tarjetaRegister: any){
    return this.http.post(this.url + "/auth/register", tarjetaRegister)
  }
  loadTipoDocumento(){
    return this.http.get<tipoDocumentoUser[]>(this.url + "/tipoDocumentoUser")
  }
}
