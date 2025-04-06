import type { Routes } from "@angular/router";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { ConfiguracionComponent } from "./usuario/configuracion/configuracion.component";

export const routes: Routes = [
	{
		path: "",
		component: InicioComponent,
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
				component: ConfiguracionComponent
			}
		]
	}
];
