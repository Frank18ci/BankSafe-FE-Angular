import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import UserI from '../../../model/UserI';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TipoTarjetaService } from '../../../services/tipoTarjeta/tipo-tarjeta.service';
import { TipoMonedaTarjetaService } from '../../../services/tipoMonedaTarjeta/tipo-moneda-tarjeta.service';
import { TarjetaService } from '../../../services/Tarjeta/tarjeta.service';
import { ToastrService } from 'ngx-toastr';
import Transaccion from '../../../model/Transaccion';

@Component({
  selector: 'app-transferencia',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.scss'
})
export class TransferenciaComponent {
  tarjetaSeleccionada: string = ''; 
  tarjetaSeleccionadaBoton: string = '';
  tarjetas = [
    { moneda: 'Libras (GBP)', simbolo: '£', monto: 500, valor: 'GBP1' }
  ];
  constructor(private usuarioService: UsuarioService,
    private cookieService : CookieService, 
    private router : Router,
    private tipoTarjetaService: TipoTarjetaService,
    private tipoMonedaTarjetasService: TipoMonedaTarjetaService,
    private tarjetaService: TarjetaService,
    private toastrService: ToastrService){
      this.cargarUsuario()
  }
  usuario: UserI = {}
  formGroupTarjetaDestino = new FormGroup({
    tarjetaId: new FormControl()
  });
    cargarUsuario(){
      const data : UserI = JSON.parse(this.cookieService.get('user'))
      if(data){
        this.usuarioService.findI(data.id ? data.id : 0).subscribe((data: any) => {
          if(data){
      this.cookieService.set('user', JSON.stringify(data), {
        path: '/',
        });
        this.usuario = data;
        console.log(this.usuario);
      } else{
      this.removerCookies()
      }
        });
      }
    }
    removerCookies(){
      this.cookieService.delete("user")
      this.cookieService.delete("username")
      this.cookieService.delete("token")
      this.router.navigate(['auth/login'])
    }
    transacion : Transaccion = {
      id: 0,
      monto: 0,
      tipoTransacion: {
        id: 0,
        tipo: ''
      },
      tarjetaOrigen: {},
      tarjetaDestino: {}
    }
    cambioInput(event : Event){
      const inputElement = event.target as HTMLInputElement;
      this.transacion.tarjetaOrigen.id = parseInt(inputElement.value);
      console.log(this.transacion)
    }
}
