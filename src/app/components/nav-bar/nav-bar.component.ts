import { Component, Inject, inject, Input } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { TarjetaService } from "../../services/Tarjeta/tarjeta.service";
import { Router, RouterLink } from "@angular/router";
import User from "../../model/User";
import Tarjeta from "../../model/Tarjeta";
import UserI from "../../model/UserI";
import { UsuarioService } from "../../services/usuario/usuario.service";

@Component({
	selector: "app-nav-bar",
	imports: [RouterLink],
	templateUrl: "./nav-bar.component.html",
	styleUrl: "./nav-bar.component.scss",
})
export class NavBarComponent {
	private userService = inject(UsuarioService);
	private tarjetaService = inject(TarjetaService);

	private cookieService = inject(CookieService)
	private router = inject(Router)
	constructor(){
		//console.log(this.usuario)
	}
	removerCookies(){
		this.cookieService.delete("user")
		this.cookieService.delete("username")
		this.cookieService.delete("token")
		this.consultaUsuario()
	}
	usuario: UserI = {};
	  consultaUsuario() {
		this.tarjetaService
		  .findByNumeroTarjeta(this.cookieService.get('username'))
		  .subscribe({next:
			(data: any) => {
			this.userService.findI(data.user.id).subscribe((data: any) => {
			  if(data){
				this.cookieService.set('user', JSON.stringify(data), {
					path: '/',
				  });
				  this.usuario = data;
				  console.log(this.usuario);
			  } else{
				this.removerCookies()
			  }
			});
		  },
		  error: error => {
			this.removerCookies();
			
		  }});
	  }
}
