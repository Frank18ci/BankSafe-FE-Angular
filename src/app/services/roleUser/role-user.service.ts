import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleUserService {
  private http = inject(HttpClient);
	url = "http://localhost:8080";
  constructor() { }
  //CRUD
  list(){
    return this.http.get(this.url + "/roleUser")
  }
  find(id: number){
    return this.http.get(this.url + `/roleUser/${id}`)
  }
}
