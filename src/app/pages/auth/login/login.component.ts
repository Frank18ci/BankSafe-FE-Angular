import { Component, inject } from "@angular/core";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import type tipoDocumentoUser from "../../../model/TipoDocumentoUser";
import { AuthService } from "../../../services/auth/auth.service";
import { TarjetaService } from "../../../services/Tarjeta/tarjeta.service";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
	selector: "app-login",
	imports: [ReactiveFormsModule],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.scss",
})
export class LoginComponent {
	
	private apiService = inject(AuthService);
	
	toastrService = inject(ToastrService)
	
	private router = inject(Router)
	
	private cookieService = inject(CookieService)

	validarExistenciaToken(){
		if(this.cookieService.get('token')){
			this.router.navigate([''])
		}
	}

	constructor() {
		this.validarExistenciaToken()
	}
	loginForm = new FormGroup({
		username: new FormControl("", Validators.required),
		password: new FormControl("", Validators.required),
	});
	user = { numeroTarjeta: "", claveInternet: "" };
	login() {
		this.user.numeroTarjeta =
			this.loginForm.value.username != null
				? this.loginForm.value.username
				: "";
		this.user.claveInternet =
			this.loginForm.value.password != null
				? this.loginForm.value.password
				: "";

		this.apiService.login(this.user).subscribe((data: any) => {
			if(data){
				this.toastrService.success(data.Message, "Bienvenido");
				this.cookieService.set('token', data.token, {
					path: '/'
				})
				this.cookieService.set('username', data.User.username, {
					path: '/'
				})
				this.router.navigate([''])
			}
		});
	}
}
