import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroments } from '../enviroment/enviroment';
import { Empresa } from '../../model/servicio/Empresa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private http = inject(HttpClient);
  urlPath = enviroments.URLBACKEND
  constructor() { }
  getEmpresas(): Observable<Empresa[]>{
    return this.http.get<Empresa[]>(this.urlPath + "/empresa");
  }
  getEmpresaById(id: number): Observable<Empresa>{
    return this.http.get<Empresa>(this.urlPath + "/empresa/" + id);
  }
  getEmpresaByNombreAndTipoEmpresaDescripcion(nombre: string, tipoEmpresaDescripcion: string): Observable<Empresa[]>{
    const params = new HttpParams()
      .set("nombre", nombre)
      .set("tipoEmpresaDescripcion", tipoEmpresaDescripcion);
    return this.http.get<Empresa[]>(this.urlPath + "/empresa/buscarNombreAndDescripcion", { params });
  }

}
