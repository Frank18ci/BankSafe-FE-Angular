import { Component, inject, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { FooterComponent } from "./components/footer/footer.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { CookieService } from "ngx-cookie-service";
import { TarjetaService } from "./services/Tarjeta/tarjeta.service";
import User from "./model/User";
import Tarjeta from "./model/Tarjeta";
import { UsuarioService } from "./services/usuario/usuario.service";
import UserI from "./model/UserI";

@Component({
	selector: "app-root",
	imports: [RouterOutlet, NavBarComponent, FooterComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit{
	private cookieService = inject(CookieService)
	private router = inject(Router)
	
	title = "Bank-Safe";
	login : boolean = false

	verificarLogin() {
		const rutasPublicas = ['/auth/login', '/auth/register'];
		const currentUrl = this.router.url;
		const token = this.cookieService.get('token');
		const username = this.cookieService.get('username');
		if (token && username) {
			this.login = true;
		  } else {
			this.login = false;
			if (!rutasPublicas.some(r => currentUrl.startsWith(r))) {
				this.router.navigate(['auth/login']);
			  }
		  }
	  }

	ngOnInit(): void {
		this.router.events.subscribe((event) =>{
			if(event instanceof NavigationEnd){
				this.verificarLogin();
			}
		});
		
	}
}
