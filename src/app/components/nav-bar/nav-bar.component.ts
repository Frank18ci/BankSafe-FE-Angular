import { Component, Inject, inject, Input } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { TarjetaService } from "../../services/Tarjeta/tarjeta.service";
import { Router } from "@angular/router";
import User from "../../model/User";
import Tarjeta from "../../model/Tarjeta";
import UserI from "../../model/UserI";

@Component({
	selector: "app-nav-bar",
	imports: [],
	templateUrl: "./nav-bar.component.html",
	styleUrl: "./nav-bar.component.scss",
})
export class NavBarComponent {
	@Input() usuario: UserI = {}

	private cookieService = inject(CookieService)
	private router = inject(Router)
	constructor(){
		//console.log(this.usuario)
	}
	removerCookies(){
		this.cookieService.delete("user")
		this.cookieService.delete("username")
		this.cookieService.delete("token")
		this.router.navigate(['auth/login'])
	}
}
