import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTarjetaComponent } from '../../../components/card/card-tarjeta/card-tarjeta.component';
import UserI from '../../../model/UserI';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-perfil',
  imports: [CommonModule],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.scss'
})
export class MiPerfilComponent {
  userService = inject(UsuarioService);
  cookieService = inject(CookieService);
  router = inject(Router)
  urlImg : string = ""
  usuarioCargado: UserI = {};
  cargarUsuario() {
    const data: UserI = JSON.parse(this.cookieService.get('user'));
    if (data) {
      this.userService.findI(data.id ? data.id : 0).subscribe((data: any) => {
        if (data) {
          this.cookieService.set('user', JSON.stringify(data), {
            path: '/',
          });
          this.usuarioCargado = data;
          this.urlImg = "http://localhost:8080/user/images/" + this.usuarioCargado.imagePath
          console.log(this.usuarioCargado);
        } else {
          this.removerCookies();
        }
      });
      
    }
  }
  removerCookies() {
    this.cookieService.delete('user');
    this.cookieService.delete('username');
    this.cookieService.delete('token');
    this.router.navigate(['auth/login']);
  }
  constructor(){
    this.cargarUsuario()
    
  }
  usuario = {
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    foto: 'assets/images/default-profile.png'
  };

  tarjetas = [
    { tipo: 'Visa', ultimosDigitos: '1234' },
    { tipo: 'MasterCard', ultimosDigitos: '5678' }
  ];

  actividades = [
    'Realizaste una transferencia de $500',
    'Pagaste tu tarjeta de crédito',
    'Recibiste un depósito de $1,000'
  ];
  trackById(index: number, item: any): number {
    return item.id; // Asegúrate de que cada tarjeta tenga un campo `id`
  }
}
