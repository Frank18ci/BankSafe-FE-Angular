import { Component, inject, OnChanges, SimpleChanges } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
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
export class AppComponent implements OnChanges{
	private cookieService = inject(CookieService)
	private tarjetaService = inject(TarjetaService)
	private userService = inject(UsuarioService)
	private router = inject(Router)
	user: UserI = {}
	title = "Bank-Safe";
	consultaUsuario(){
		if(this.cookieService.get('user')){
			this.user = JSON.parse(this.cookieService.get('user'))
		} else{
			this.tarjetaService.findByNumeroTarjeta(this.cookieService.get('username')).subscribe((data :any) =>{
				this.userService.findI(data.user.id).subscribe((data :any) =>{
					this.cookieService.set('user', JSON.stringify(data))
					this.user = data
					console.log(this.user)
				})
			})
		}
			
		
	}
	ngOnChanges(changes: SimpleChanges): void {
		if(this.cookieService.get('token') && this.cookieService.get("username")){
			this.login = true;
			this.consultaUsuario();
		} else {
			this.router.navigate(['auth/login'])
		}
	}
	login : boolean = false
	constructor(){
		if(this.cookieService.get('token') && this.cookieService.get("username")){
			this.login = true;
			this.consultaUsuario();
		} else {
			//this.router.navigate(['auth/login'])
		}
	}
}
