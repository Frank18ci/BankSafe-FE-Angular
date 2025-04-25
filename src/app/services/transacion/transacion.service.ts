import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Transaccion from '../../model/Transaccion';
import TransaccionConversionMoneda from '../../model/TransaccionConversionMoneda';

@Injectable({
  providedIn: 'root'
})
export class TransacionService {
	url = "http://localhost:8080";
  constructor(private http : HttpClient) { }

  realizarCambioyTransferencia(transacion : TransaccionConversionMoneda){
    return this.http.post<TransaccionConversionMoneda>(this.url + "/transacion/transferenciaDineroConvertido", transacion)
  }
}
