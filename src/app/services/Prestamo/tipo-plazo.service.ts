import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoPlazo } from '../../model/prestamo/tipo-plazo';
import { enviroments } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class TipoPlazoService {
  private http = inject(HttpClient);
  urlPath = enviroments.URLBACKEND
  constructor() { }
  getTipoPlazos(): Observable<TipoPlazo[]>{
    return this.http.get<TipoPlazo[]>(this.urlPath + "/tipoPlazo");
  }
}
