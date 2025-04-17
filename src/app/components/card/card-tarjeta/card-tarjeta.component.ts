import { Component, Input } from "@angular/core";
import Tarjeta from "../../../model/Tarjeta";

@Component({
	selector: "app-card-tarjeta",
	imports: [],
	templateUrl: "./card-tarjeta.component.html",
	styleUrl: "./card-tarjeta.component.scss",
})
export class CardTarjetaComponent {
	@Input() tarjeta : Tarjeta = {}
}
