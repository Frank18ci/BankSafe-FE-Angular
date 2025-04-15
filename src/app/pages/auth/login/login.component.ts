import { Component, inject } from "@angular/core";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import type tipoDocumentoUser from "../../../model/TipoDocumentoUser";
import { AuthService } from "../../../services/auth/auth.service";
//import { LocalStorageService } from 'ngx-webstorage';
import { TarjetaService } from "../../../services/Tarjeta/tarjeta.service";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
@Component({
	selector: "app-login",
	imports: [ReactiveFormsModule],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.scss",
})
export class LoginComponent {
	listaTipoDocumentoUser: tipoDocumentoUser[] = [];
	private apiService = inject(AuthService);
	private toastr = inject(ToastrService);
	private router = inject(Router)
	
	private cookieService = inject(CookieService)
	constructor(
		
	) {
		if(this.cookieService.get('token')){
			this.router.navigate([''])
		}
		this.apiService.loadTipoDocumento().subscribe((lista) => {
			if(lista){
				this.listaTipoDocumentoUser = lista;
			}
		});
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
				this.toastr.success(data.Message, data.User.username, data.token);
				this.cookieService.set('token', data.token)
				this.cookieService.set('username', data.User.username)
				this.router.navigate([''])
			}
		});
	}
}
