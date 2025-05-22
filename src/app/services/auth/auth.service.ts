import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import type tipoDocumentoUser from "../../model/TipoDocumentoUser";
import { catchError, Observable, of, throwError } from "rxjs";
import { enviroments } from "../enviroment/enviroment";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private http = inject(HttpClient);
	url = enviroments.URLBACKEND;

	constructor() {}

	login(user: any) : Observable<any> {
		return this.http.post(this.url + "/login", user).pipe(
				  catchError(error => {
					if(error.status === 404){
					  return of(null);
					}
					return throwError(()=> error);
				  }));
	}
	register(tarjetaRegister: any) : Observable<any>{
		return this.http.post(this.url + "/auth/register", tarjetaRegister);
	}
	loadTipoDocumento() : Observable<tipoDocumentoUser[]>{
		return this.http.get<tipoDocumentoUser[]>(this.url + "/tipoDocumentoUser");
	}
}
