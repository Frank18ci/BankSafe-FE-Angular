import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { url } from '../produccion/Url';
import { Observable } from 'rxjs';
import { TipoPlazo } from '../../model/prestamo/tipo-plazo';

@Injectable({
  providedIn: 'root'
})
export class TipoPlazoService {
  private http = inject(HttpClient);
  urlPath = url
  constructor() { }
  getTipoPlazos(): Observable<TipoPlazo[]>{
    return this.http.get<TipoPlazo[]>(this.urlPath + "/tipoPlazo");
  }
}
