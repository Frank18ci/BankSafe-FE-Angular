import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Tarjeta from '../../model/Tarjeta';
import { Page } from '../../model/Page';
import { Observable } from 'rxjs';
import { enviroments } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private http = inject(HttpClient);
	url = enviroments.URLBACKEND;
  constructor() { }
    save(tarjeta: Tarjeta): Observable<Tarjeta>{
      return this.http.post<Tarjeta>(this.url + "/tarjeta", tarjeta)
    }
    findByNumeroTarjeta(numeroTarjeta: string) : Observable<Tarjeta>{
      return this.http.get<Tarjeta>(this.url + "/tarjeta/buscar/" +numeroTarjeta)
    }

    getAuthToken(){
      return localStorage.getItem('token') || ''
    }
    getRefreshToken(){
      return localStorage.getItem('refreshToken') || ''
    }

    getPageByNumeroTarjeta(numeroTarjeta: string, tipoMonedaTarjeta: string, numeroTarjetaExcluida : string): Observable<Page>{
      const params = new HttpParams()
      .set('numeroTarjeta', numeroTarjeta)
      .set('tipoMonedaTarjeta', tipoMonedaTarjeta)
      .set('numeroTarjetaExcluida', numeroTarjetaExcluida)

      return this.http.get<Page>(this.url + "/tarjeta/page", {params});
    }
}
