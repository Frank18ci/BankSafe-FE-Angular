import { Component, inject } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { FooterComponent } from "./components/footer/footer.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { CookieService } from "ngx-cookie-service";
import { TarjetaService } from "./services/Tarjeta/tarjeta.service";
import User from "./model/User";

@Component({
	selector: "app-root",
	imports: [RouterOutlet, NavBarComponent, FooterComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent {
	private cookieService = inject(CookieService)
	private tarjetaService = inject(TarjetaService)
	private router = inject(Router)
	user: User = {}
	title = "Bank-Safe";
	consultaUsuario(){
		this.tarjetaService.findByNumeroTarjeta(this.cookieService.get('username')).subscribe((data :any) =>{
			this.cookieService.set('user', JSON.stringify(data))
			this.user = data
			console.log(this.user)
		})
	}
	login : boolean = false
	constructor(){
		if(this.cookieService.get('token') && this.cookieService.get("username")){
			this.login = true;
			this.consultaUsuario();
		} else {
			this.router.navigate(['auth/login'])
		}
	}
}
