import { Component, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CardAccionComponent } from '../../components/card/card-accion/card-accion.component';
import { CardTarjetaComponent } from '../../components/card/card-tarjeta/card-tarjeta.component';
import User from '../../model/User';
import { CookieService } from 'ngx-cookie-service';
import Tarjeta from '../../model/Tarjeta';
import UserI from '../../model/UserI';
import { TarjetaService } from '../../services/Tarjeta/tarjeta.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio',
  imports: [CardAccionComponent, CardTarjetaComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent {
  cookieService = inject(CookieService);
  private tarjetaService = inject(TarjetaService);
  private userService = inject(UsuarioService);
  private router = inject(Router);
  fechaActual = new Date();
  fechaFormatString = this.fechaActual.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  fecha =
    'Sesión activa ' +
    this.fechaFormatString +
    ' a las ' +
    this.fechaActual.getHours() +
    ':' +
    this.fechaActual.getMinutes() +
    'hrs.';
  usuario: UserI = {};
  consultaUsuario() {
    this.tarjetaService
      .findByNumeroTarjeta(this.cookieService.get('username'))
      .subscribe((data: any) => {
        this.userService.findI(data.user.id).subscribe((data: any) => {
          this.cookieService.set('user', JSON.stringify(data), {
            path: '/',
          });
          this.usuario = data;
          console.log(this.usuario);
        });
      });
  }
  login = false;
  constructor() {
    if (this.cookieService.get('token') && this.cookieService.get('username')) {
      this.login = true;
      this.consultaUsuario();
    } else {
		this.login = false;
      this.router.navigate(['auth/login']);
    }
  }
}
