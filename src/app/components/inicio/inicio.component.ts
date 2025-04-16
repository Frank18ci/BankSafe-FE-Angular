import { Component } from "@angular/core";
import { CardAccionComponent } from "./card-accion/card-accion.component";
import { CardTarjetaComponent } from "./card-tarjeta/card-tarjeta.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
	selector: "app-inicio",
	imports: [CardAccionComponent, CardTarjetaComponent, MatSlideToggleModule],
	templateUrl: "./inicio.component.html",
	styleUrl: "./inicio.component.scss",
})
export class InicioComponent {}
