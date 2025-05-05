import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroments } from '../enviroment/enviroment';
import { Observable } from 'rxjs';
import RoleUser from '../../model/RoleUser';

@Injectable({
  providedIn: 'root'
})
export class RoleUserService {
  private http = inject(HttpClient);
	url = enviroments.URLBACKEND;
  constructor() { }
  //CRUD
  list() : Observable<RoleUser[]>{
    return this.http.get<RoleUser[]>(this.url + "/roleUser")
  }
  find(id: number) : Observable<RoleUser>{
    return this.http.get<RoleUser>(this.url + `/roleUser/${id}`)
  }
}
