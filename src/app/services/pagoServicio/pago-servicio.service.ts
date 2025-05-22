import { inject, Injectable } from '@angular/core';
import { enviroments } from '../enviroment/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagoServicio } from '../../model/servicio/PagoServicio';

@Injectable({
  providedIn: 'root'
})
export class PagoServicioService {
  private http = inject(HttpClient);
  urlPath = enviroments.URLBACKEND
  constructor() { }
  getPagosServicioByCodigoAndEstado(codigo: string, estado: string): Observable<PagoServicio[]> {
    const params = new HttpParams()
    .set("codigo", codigo)
    .set("estado", estado);
    return this.http.get<PagoServicio[]>(this.urlPath + "/pagoServicio/busquedaPagar", { params });
  }
  realizarPagoServicio(pagoServicio: PagoServicio, idTarjeta : number): Observable<PagoServicio> {
    const params = new HttpParams()
    .set("idTarjeta", idTarjeta.toString())
    return this.http.post<PagoServicio>(this.urlPath + "/pagoServicio/realizarPago", pagoServicio, { params });
  }
}
