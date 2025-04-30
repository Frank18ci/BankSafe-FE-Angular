import { Component, Input } from "@angular/core";
import Tarjeta from "../../../model/Tarjeta";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-card-tarjeta",
	imports: [CommonModule],
	templateUrl: "./card-tarjeta.component.html",
	styleUrl: "./card-tarjeta.component.scss",
})
export class CardTarjetaComponent {
	@Input() tarjeta : Tarjeta = {}
}
