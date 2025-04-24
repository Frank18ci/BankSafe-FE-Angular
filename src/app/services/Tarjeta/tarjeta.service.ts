import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Tarjeta from '../../model/Tarjeta';
import { Page } from '../../model/Page';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private http = inject(HttpClient);
	url = "http://localhost:8080";
  constructor() { }
    save(tarjeta: Tarjeta): Observable<any>{
      return this.http.post(this.url + "/tarjeta", tarjeta)
    }
    findByNumeroTarjeta(numeroTarjeta: string){
      return this.http.get(this.url + "/tarjeta/buscar/" +numeroTarjeta)
    }

    getAuthToken(){
      return localStorage.getItem('token') || ''
    }
    getRefreshToken(){
      return localStorage.getItem('refreshToken') || ''
    }

    getPageByNumeroTarjeta(){
      return this.http.get<Page>(this.url + "/tarjeta/page");
    }
}
