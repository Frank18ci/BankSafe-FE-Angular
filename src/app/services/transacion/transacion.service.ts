import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Transaccion from '../../model/Transaccion';
import TransaccionConversionMoneda from '../../model/TransaccionConversionMoneda';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransacionService {
	url = "http://localhost:8080";
  constructor(private http : HttpClient) { }

  realizarCambioyTransferencia(transacion : TransaccionConversionMoneda){
    return this.http.post<TransaccionConversionMoneda>(this.url + "/transacion/transferenciaDineroConvertido", transacion)
  }
  realizarTransferencia(transacion: Transaccion){
    return this.http.post<Transaccion>(this.url + "/transacion", transacion)
  }

  solicitarTransferenciasFechasNumeroTarjetaEnvio() : Observable<Transaccion[]>{
    return this.http.get<Transaccion[]>(this.url + "/transacion/busquedaFechaNumeroTarjeta?fechaInicio=2022-02-02&fechaFin=2026-02-02&numeroTarjeta=123456")
  }
}
