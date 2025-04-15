import type { Routes } from "@angular/router";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { ConfiguracionComponent } from "./usuario/configuracion/configuracion.component";
import { userGuardGuard } from "./UserGuard/user-guard.guard";
import { CreditCardComponent } from "./pages/card/credit-card/credit-card.component";
import { SolicitarPrestamoComponent } from "./pages/opciones/solicitar-prestamo/solicitar-prestamo.component";
import { CambiarMonedaComponent } from "./pages/opciones/cambiar-moneda/cambiar-moneda.component";

export const routes: Routes = [
	{
		path: "",
		component: InicioComponent,
		//canActivate: [userGuardGuard]
	},
	{
		path: "auth",
		children: [
			{
				path: "login",
				component: LoginComponent,
			},
			{
				path: "register",
				component: RegisterComponent,
			},
		]
	},
	{
		path: "usuario",
		children:[
			{
				path: "configuracion",
				component: ConfiguracionComponent,
				//canActivate: [userGuardGuard]
			}
		]
	},
	{
		path: "card",
		children:[
			{
				path:"credit-card",
				component: CreditCardComponent
			}
		]
	},
	{
		path: "opciones",
		children:[
			{
				path:"solicitar-prestamo",
				component: SolicitarPrestamoComponent
			},
			{
				path:"cambiar-moneda",
				component: CambiarMonedaComponent
			}
		]
	}
];
