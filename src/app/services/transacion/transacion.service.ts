import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Transaccion from '../../model/Transaccion';

@Injectable({
  providedIn: 'root'
})
export class TransacionService {
	url = "http://localhost:8080";
  constructor(private http : HttpClient) { }

  realizarCambioyTransferencia(transacion : Transaccion){
    this.http.post<Transaccion>(this.url + "/trasacion/transferenciaDineroConvertido", transacion)
  }
}
