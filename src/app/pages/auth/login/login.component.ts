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
import { CardInputMaskDirective } from "../../../directive/card-input-mask.directive";

@Component({
	selector: "app-login",
	imports: [ReactiveFormsModule, CardInputMaskDirective],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.scss",
})
export class LoginComponent {
	
	private apiService = inject(AuthService);
	
	toastrService = inject(ToastrService)
	
	private router = inject(Router)
	
	private cookieService = inject(CookieService)


	constructor() {
	
	}
	loginForm = new FormGroup({
		username: new FormControl("", Validators.required),
		password: new FormControl("", Validators.required),
	});
	user = { numeroTarjeta: "", claveInternet: "" };
	login() {
		this.user.numeroTarjeta =
			this.loginForm.value.username != null
				? this.loginForm.value.username.replace(/ /g, "")
				: "";
		this.user.claveInternet =
			this.loginForm.value.password != null
				? this.loginForm.value.password
				: "";
		console.log(this.user.numeroTarjeta)
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
			} else{
				this.toastrService.error("Datos Incorrecto", "Error");
			}},
			(error) =>{
				this.toastrService.error("Datos Incorrecto " + error.status, "Error");
			}
		);
	}
}
