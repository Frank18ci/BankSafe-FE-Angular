import { Component } from "@angular/core";
import { CardAccionComponent } from "./card-accion/card-accion.component";
import { CardTarjetaComponent } from "./card-tarjeta/card-tarjeta.component";

@Component({
	selector: "app-inicio",
	imports: [CardAccionComponent, CardTarjetaComponent],
	templateUrl: "./inicio.component.html",
	styleUrl: "./inicio.component.scss",
})
export class InicioComponent {}
