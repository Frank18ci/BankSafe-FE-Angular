import { Component, inject, OnChanges, SimpleChanges } from "@angular/core";
import { CardAccionComponent } from "../../components/card/card-accion/card-accion.component";
import { CardTarjetaComponent } from "../../components/card/card-tarjeta/card-tarjeta.component";
import User from "../../model/User";
import { CookieService } from "ngx-cookie-service";
import Tarjeta from "../../model/Tarjeta";
import UserI from "../../model/UserI";
@Component({
	selector: "app-inicio",
	imports: [CardAccionComponent, CardTarjetaComponent],
	templateUrl: "./inicio.component.html",
	styleUrl: "./inicio.component.scss",
})
export class InicioComponent{
	cookieService = inject(CookieService)
	fechaActual = new Date();
	fechaFormatString = this.fechaActual.toLocaleDateString('es-PE', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	  });
	fecha =  "Sesión activa " + this.fechaFormatString + " a las " + this.fechaActual.getHours() + ":" + this.fechaActual.getMinutes() + "hrs.";
	usuario: UserI = {}
	constructor(){
		if(this.cookieService.get('user')){
			this.usuario = JSON.parse(this.cookieService.get('user'))	
		}
		
	}
}
