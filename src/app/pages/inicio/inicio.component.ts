import { Component } from "@angular/core";
import { CardAccionComponent } from "../../components/card/card-accion/card-accion.component";
import { CardTarjetaComponent } from "../../components/card/card-tarjeta/card-tarjeta.component";
@Component({
	selector: "app-inicio",
	imports: [CardAccionComponent, CardTarjetaComponent],
	templateUrl: "./inicio.component.html",
	styleUrl: "./inicio.component.scss",
})
export class InicioComponent {}
