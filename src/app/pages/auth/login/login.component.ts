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
import { Router, RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CardInputMaskDirective } from "../../../directive/card-input-mask.directive";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-login",
	imports: [CommonModule, ReactiveFormsModule, CardInputMaskDirective, RouterLink],
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
		console.log(this.user)
		this.apiService.login(this.user).subscribe((data: any) => {
			if(data){
				this.toastrService.success(data.Message, "Bienvenido");
				this.user = { numeroTarjeta: "", claveInternet: "" };
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
				this.toastrService.error("Datos Incorrecto ", "Error");
			}
		);
	}
}
