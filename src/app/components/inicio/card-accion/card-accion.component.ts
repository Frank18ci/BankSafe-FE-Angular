import { Component, inject, Input } from "@angular/core";

@Component({
	selector: "app-card-accion",
	imports: [],
	templateUrl: "./card-accion.component.html",
	styleUrl: "./card-accion.component.scss",
})
export class CardAccionComponent {
	@Input() title: string = ""
	@Input() icon: string = ""
	@Input() url: string = ""
}
