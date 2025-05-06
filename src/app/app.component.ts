import { Component, inject, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { FooterComponent } from "./components/footer/footer.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { CookieService } from "ngx-cookie-service";
import { TarjetaService } from "./services/Tarjeta/tarjeta.service";
import User from "./model/User";
import Tarjeta from "./model/Tarjeta";
import { UsuarioService } from "./services/usuario/usuario.service";
import UserI from "./model/UserI";

@Component({
	selector: "app-root",
	imports: [RouterOutlet],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent {
}
