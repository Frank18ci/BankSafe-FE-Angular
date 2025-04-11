import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Tarjeta from '../../model/Tarjeta';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private http = inject(HttpClient);
	url = "http://localhost:8080";
  constructor() { }
    save(tarjeta: Tarjeta){
      return this.http.post(this.url + "/tarjeta", tarjeta)
    }
    findByNumeroTarjeta(numeroTarjeta: string){
      return this.http.get(this.url + "/tarjeta/buscar/" +numeroTarjeta)
    }
}
