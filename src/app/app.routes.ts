import type { Routes } from "@angular/router";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { ConfiguracionComponent } from "./pages/usuario/configuracion/configuracion.component";
import { userGuardGuard } from "./securty/UserGuard/user-guard.guard";
import { SolicitarPrestamoComponent } from "./pages/opciones/solicitar-prestamo/solicitar-prestamo.component";
import { CambiarMonedaComponent } from "./pages/opciones/cambiar-moneda/cambiar-moneda.component";
import { TransferenciaComponent } from "./pages/opciones/transferencia/transferencia.component";
import { SolicitarTarjetaComponent } from "./pages/opciones/solicitar-tarjeta/solicitar-tarjeta.component";
import { TransferenciasInternasComponent } from "./pages/operaciones/transferencias-internas/transferencias-internas.component";
import { TransferenciasInterbancariasComponent } from "./pages/operaciones/transferencias-interbancarias/transferencias-interbancarias.component";
import { PagoDeServiciosComponent } from "./pages/operaciones/pago-de-servicios/pago-de-servicios.component";
import { SeguridadYSoporteComponent } from "./pages/explora/seguridad-y-soporte/seguridad-y-soporte.component";
import { BeneficiosYPromocionesComponent } from "./pages/explora/beneficios-y-promociones/beneficios-y-promociones.component";
import { MiPerfilComponent } from "./pages/usuario/mi-perfil/mi-perfil.component";
import { CardDetailComponent } from "./components/card/card-detail/card-detail.component";
import { SolicitarComponent } from "./pages/opciones/solicitar-prestamo/solicitar/solicitar.component";
import { PrestamoDetalleComponent } from "./pages/opciones/solicitar-prestamo/prestamo-detalle/prestamo-detalle.component";

export const routes: Routes = [
	{
		path: "",
		component: InicioComponent,
		canActivate: [userGuardGuard]
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
				path: "mi-perfil",
				component: MiPerfilComponent,
			},
			{
				path: "configuracion",
				component: ConfiguracionComponent,
			}
		],
		canActivate: [userGuardGuard]
	},
	{
		path: "card/:numeroTarjeta",
		component: CardDetailComponent
	},
	{
		path: "opciones",
		children:[
			{
				path:"solicitar-prestamo",
				children: [
					{
						path: "",
						component: SolicitarPrestamoComponent
					},
					{
						path: "solicitar",
						component: SolicitarComponent
					},
					{
						path: "prestamo-detalle/:id",
						component: PrestamoDetalleComponent
					},
				]
			},
			{
				path:"cambiar-moneda",
				component: CambiarMonedaComponent
			},
			{
				path:"tranferencia",
				component: TransferenciaComponent
			},
			{
				path:"solicitar-tarjeta",
				component: SolicitarTarjetaComponent
			}
		]
	},
	{
		path: "operaciones",
		children: [
			{
				path:"transferencias-internas",
				component: TransferenciasInternasComponent
			},
			{
				path:"transferencias-interbancaria",
				component: TransferenciasInterbancariasComponent
			},
			{
				path:"pago-de-servicio",
				component: PagoDeServiciosComponent
			},
			{
				path:"cambio-de-moneda",
				component: CambiarMonedaComponent
			},
		]
	},
	{
		path: "explora",
		children: [
			{
				path:"prestamos-y-creditos",
				component: SolicitarPrestamoComponent
			},
			{
				path:"tarjetas",
				component: SolicitarTarjetaComponent
			},
			{
				path:"beneficios-y-promociones",
				component: BeneficiosYPromocionesComponent
			},
			{
				path:"seguridad-y-soporte",
				component: SeguridadYSoporteComponent
			},
		]
	}
];
