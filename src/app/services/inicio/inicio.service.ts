import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class InicioService {
	private http = inject(HttpClient);
	url = "http://localhost:8080";
	constructor() {}
	login(user: any): Observable<any> {
		return this.http.post(this.url + "/login", user);
	}
}
