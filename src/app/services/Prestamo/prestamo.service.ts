import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from '../../model/prestamo/prestamo';
import { enviroments } from '../enviroment/enviroment';
@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private http = inject(HttpClient);
  urlPath = enviroments.URLBACKEND
  constructor() { }
  getPrestamosByIdUsuario(idUsuario: number): Observable<Prestamo[]>{
    return this.http.get<Prestamo[]>(this.urlPath + "/prestamo/buscarUsuario/" + idUsuario);
  }
  getPrestamosById(id: number): Observable<Prestamo>{
    return this.http.get<Prestamo>(this.urlPath + "/prestamo/" + id);
  }
  savePrestamo(prestamo: Prestamo): Observable<Prestamo>{
    return this.http.post<Prestamo>(this.urlPath + "/prestamo", prestamo);
  }
  precalculoprestamo(prestamo: Prestamo): Observable<Prestamo>{
    return this.http.post<Prestamo>(this.urlPath + "/prestamo/precalculoprestamo", prestamo);
  }
  realizarPago(id: number): Observable<Prestamo>{
    return this.http.get<Prestamo>(this.urlPath + "/prestamo/realizarPago/" + id);
  }
}
