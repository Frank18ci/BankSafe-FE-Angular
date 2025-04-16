import { Component, Inject, inject, Input } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { TarjetaService } from "../../services/Tarjeta/tarjeta.service";
import { Router } from "@angular/router";
import User from "../../model/User";
import { MdbDropdownModule } from "mdb-angular-ui-kit/dropdown";

@Component({
	selector: "app-nav-bar",
	imports: [MdbDropdownModule],
	templateUrl: "./nav-bar.component.html",
	styleUrl: "./nav-bar.component.scss",
})
export class NavBarComponent {
	@Input() usuario: User = {}

	private cookieService = inject(CookieService)
	private router = inject(Router)
	removerCookies(){
		this.cookieService.deleteAll()
		this.router.navigate(['auth/login'])
	}
}
