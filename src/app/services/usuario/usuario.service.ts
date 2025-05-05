import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import User from '../../model/User';
import { catchError, Observable, of, throwError } from 'rxjs';
import { enviroments } from '../enviroment/enviroment';
import UserI from '../../model/UserI';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
	private http = inject(HttpClient);
	url = enviroments.URLBACKEND;
  constructor() { }
  uploadUserImage(formData: FormData): Observable<any>{
    return this.http.post<any>(this.url + "/user/img", formData)
  }

  //crud operations
  list(): Observable<User>{
    return this.http.get<User>(this.url + "/user")
  }
  find(id: number): Observable<User>{
    return this.http.get<User>(this.url + `/user/${id}`)
  }
  findI(id: number): Observable<UserI | null> {
    return this.http.get<UserI>(this.url + `/user/userTarjetas/${id}`).pipe(
              catchError(error => {
                if(error.status === 404){
                  return of(null);
                }
                return throwError(()=> error);
              })
            )
  }
  save(user: User) : Observable<User>{
    return this.http.post<User>(this.url + "/user", user)
  }
  update(user: User): Observable<User>{
    return this.http.put<User>(this.url + "/user", user)
  }
  delete(id: number): Observable<any>{
    return this.http.delete<any>(this.url + `/user/${id}`)
  }
}
