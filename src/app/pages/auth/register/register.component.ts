import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TipoDocumentoUserService } from "../../../services/tipoDocumentoUser/tipo-documento-user.service";
import tipoDocumentoUser from "../../../model/TipoDocumentoUser";

@Component({
	selector: "app-register",
	imports: [ReactiveFormsModule],
	templateUrl: "./register.component.html",
	styleUrl: "./register.component.scss",
})
export class RegisterComponent {
	tipoDocumentoUserService = inject(TipoDocumentoUserService)
	formUser = new FormGroup({
		id: new FormControl("")
	})
	listaTipoDocumentoUser : tipoDocumentoUser[] = []
	constructor(){
		this.tipoDocumentoUserService.list().subscribe(data => {
			this.listaTipoDocumentoUser = data;
		})
	}
}
