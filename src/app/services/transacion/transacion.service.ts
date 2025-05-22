import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Transaccion from '../../model/Transaccion';
import TransaccionConversionMoneda from '../../model/TransaccionConversionMoneda';
import { Observable } from 'rxjs';
import { enviroments } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class TransacionService {
	url = enviroments.URLBACKEND;
  constructor(private http : HttpClient) { }

  realizarCambioyTransferencia(transacion : TransaccionConversionMoneda) : Observable<TransaccionConversionMoneda>{
    return this.http.post<TransaccionConversionMoneda>(this.url + "/transacion/transferenciaDineroConvertido", transacion)
  }
  realizarTransferencia(transacion: Transaccion): Observable<Transaccion>{
    return this.http.post<Transaccion>(this.url + "/transacion", transacion)
  }

  solicitarTransferenciasFechasNumeroTarjetaEnvio(numeroTarjeta: string) : Observable<Transaccion[]>{
    const params = new HttpParams()
    .set("fechaInicio", "2022-02-02")
    .set("fechaFin", "2026-02-02")
    .set("numeroTarjeta", numeroTarjeta)
    return this.http.get<Transaccion[]>(this.url + "/transacion/busquedaFechaNumeroTarjeta", {params})
  }
  solicitarTransferenciasFechasNumeroTarjetaEnvioUltimoMes(numeroTarjeta : string) : Observable<Transaccion[]>{
    const params = new HttpParams()
      .set('numeroTarjeta', numeroTarjeta)
    return this.http.get<Transaccion[]>(this.url + "/transacion/busquedaFechaNumeroTarjetaMesAnterior", {params})
  }
  solicitarTransferenciasFechasNumeroTarjetaEnvioActualMes(numeroTarjeta : string) : Observable<Transaccion[]>{
    const params = new HttpParams()
      .set('numeroTarjeta', numeroTarjeta)
    return this.http.get<Transaccion[]>(this.url + "/transacion/busquedaFechaNumeroTarjetaMesActual", {params})
  }

  
}
