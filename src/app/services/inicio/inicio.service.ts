import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { enviroments } from "../enviroment/enviroment";

@Injectable({
	providedIn: "root",
})
export class InicioService {
	private http = inject(HttpClient);
	url = enviroments.URLBACKEND;
	constructor() {}
	login(user: any): Observable<any> {
		return this.http.post(this.url + "/login", user);
	}
}
