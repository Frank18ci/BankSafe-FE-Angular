import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import User from '../../model/User';
import { catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
	private http = inject(HttpClient);
	url = "http://localhost:8080";
  constructor() { }
  uploadUserImage(formData: FormData): any{
    return this.http.post<any>(this.url + "/user/img", formData)
  }

  //crud operations
  list(){
    return this.http.get(this.url + "/user")
  }
  find(id: number){
    return this.http.get(this.url + `/user/${id}`)
  }
  findI(id: number){
    return this.http.get(this.url + `/user/userTarjetas/${id}`).pipe(
              catchError(error => {
                if(error.status === 404){
                  return of(null);
                }
                return throwError(()=> error);
              })
            )
  }
  save(user: User){
    return this.http.post(this.url + "/user", user)
  }
  update(user: User){
    return this.http.put(this.url + "/user", user)
  }
  delete(id: number){
    return this.http.delete(this.url + `/user/${id}`)
  }
}
