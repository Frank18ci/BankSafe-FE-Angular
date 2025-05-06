import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { InicioComponent } from '../pages/inicio/inicio.component';
import { MiPerfilComponent } from '../pages/usuario/mi-perfil/mi-perfil.component';
import { ConfiguracionComponent } from '../pages/usuario/configuracion/configuracion.component';
import { CardDetailComponent } from '../components/card/card-detail/card-detail.component';
import { SolicitarPrestamoComponent } from '../pages/opciones/solicitar-prestamo/solicitar-prestamo.component';
import { SolicitarComponent } from '../pages/opciones/solicitar-prestamo/solicitar/solicitar.component';
import { PrestamoDetalleComponent } from '../pages/opciones/solicitar-prestamo/prestamo-detalle/prestamo-detalle.component';
import { CambiarMonedaComponent } from '../pages/opciones/cambiar-moneda/cambiar-moneda.component';
import { TransferenciaComponent } from '../pages/opciones/transferencia/transferencia.component';
import { SolicitarTarjetaComponent } from '../pages/opciones/solicitar-tarjeta/solicitar-tarjeta.component';
import { TransferenciasInternasComponent } from '../pages/operaciones/transferencias-internas/transferencias-internas.component';
import { TransferenciasInterbancariasComponent } from '../pages/operaciones/transferencias-interbancarias/transferencias-interbancarias.component';
import { PagoDeServiciosComponent } from '../pages/operaciones/pago-de-servicios/pago-de-servicios.component';
import { BeneficiosYPromocionesComponent } from '../pages/explora/beneficios-y-promociones/beneficios-y-promociones.component';
import { SeguridadYSoporteComponent } from '../pages/explora/seguridad-y-soporte/seguridad-y-soporte.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: "inicio",
        component: InicioComponent,
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
        ]
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
            component: TransferenciaComponent
          },
          {
            path:"transferencias-interbancaria",
            component: TransferenciaComponent
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
      },
      {
        path: "**",
        redirectTo: "inicio",
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
