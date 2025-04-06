import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class InicioService {
	private http = inject(HttpClient);
	url = "http://localhost:8080";
	constructor() {}
	login(user: any) {
		return this.http.post(this.url + "/login", user);
	}
}
