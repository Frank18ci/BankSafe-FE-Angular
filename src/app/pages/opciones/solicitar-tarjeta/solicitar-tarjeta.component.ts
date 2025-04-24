import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Tarjeta from '../../../model/Tarjeta';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { CookieService } from 'ngx-cookie-service';
import UserI from '../../../model/UserI';
import { Router } from '@angular/router';
import { TipoTarjetaService } from '../../../services/tipoTarjeta/tipo-tarjeta.service';
import TipoTarjeta from '../../../model/TipoTarjeta';
import { TarjetaService } from '../../../services/Tarjeta/tarjeta.service';
import TipoMonedaTarjeta from '../../../model/TipoMonedaTarjeta';
import { TipoMonedaTarjetaService } from '../../../services/tipoMonedaTarjeta/tipo-moneda-tarjeta.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-solicitar-tarjeta',
  templateUrl: './solicitar-tarjeta.component.html',
  imports: [
    ReactiveFormsModule,CommonModule
  ],
  styleUrls: ['./solicitar-tarjeta.component.scss']
})
export class SolicitarTarjetaComponent implements OnInit {
  tarjetas: Tarjeta[] = [
    // { tipo: 'Visa', ultimosDigitos: '1234', transacciones: 15 },
    // { tipo: 'MasterCard', ultimosDigitos: '5678', transacciones: 8 },
    // { tipo: 'American Express', ultimosDigitos: '9012', transacciones: 20 }
  ];
  tipoTarjetas: TipoTarjeta[] = [];
  tipoMonedaTarjetas : TipoMonedaTarjeta[] = []
  formularioTarjeta: FormGroup;

  constructor(private fb: FormBuilder,
      private usuarioService: UsuarioService,
      private cookieService : CookieService, 
      private router : Router,
      private tipoTarjetaService: TipoTarjetaService,
      private tipoMonedaTarjetasService: TipoMonedaTarjetaService,
      private tarjetaService: TarjetaService,
      private toastrService: ToastrService) {
    this.formularioTarjeta = this.fb.group({
      tipo: ['', Validators.required],
      tipoMoneda: ['', [Validators.required]],
      limite: ['', [Validators.required, Validators.min(1000)]],
      claveInternet: ['', [Validators.required, Validators.maxLength(6)]]
    });
    
    this.cargarUsuario()
    this.tipoTarjetaService.list().subscribe((data) => {
      this.tipoTarjetas = data || []
    })
    this.tipoMonedaTarjetasService.list().subscribe(data => {
      this.tipoMonedaTarjetas = data
    })
  }
  usuario: UserI = {}

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
  ngOnInit(): void {}


  tarjeta: Tarjeta = {
    tipoTarjeta: {
      id: 0,
      tipo: ''
    },
    tipoMonedaTarjeta: {
      id: 0,
      tipo: '',
      simbolo: '',
      valor: 0
    }
  }
  solicitarTarjeta(): void {
    this.tarjeta.monto = this.formularioTarjeta.value.limite;
    this.tarjeta.tipoTarjeta!.id = this.formularioTarjeta.value.tipo;
    this.tarjeta.tipoMonedaTarjeta!.id = this.formularioTarjeta.value.tipoMoneda;
    this.tarjeta.claveInternet = this.formularioTarjeta.value.claveInternet;
    this.tarjeta.user = this.usuario;
    const ultimosDigitos = Math.floor(1000 + Math.random() * 9000).toString();
    this.tarjeta.numeroTarjeta = ultimosDigitos;
    this.tarjetaService.save(this.tarjeta).subscribe((data) =>{
      this.toastrService.success("Bien", "Tarjeta creada")
      this.formularioTarjeta.reset();
    },(error) =>{
      this.toastrService.error("Error", error.message)
    })
    
       
       
    
  }
}