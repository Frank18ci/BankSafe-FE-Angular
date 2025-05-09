import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
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
import Tarjeta from '../../../model/Tarjeta';
import { Page } from '../../../model/Page';
import { TransacionService } from '../../../services/transacion/transacion.service';
import { CardTarjetaComponent } from "../../../components/card/card-tarjeta/card-tarjeta.component";

@Component({
  selector: 'app-transferencia',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, CardTarjetaComponent],
  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.scss'
})
export class TransferenciaComponent implements OnInit{
  tarjetaSeleccionada: string = ''; 
  tarjetaSeleccionadaBoton: string = '';
  constructor(private usuarioService: UsuarioService,
    private cookieService : CookieService, 
    private router : Router,
    private tipoTarjetaService: TipoTarjetaService,
    private tipoMonedaTarjetasService: TipoMonedaTarjetaService,
    private tarjetaService: TarjetaService,
    private toastrService: ToastrService,
    private transferenciaService: TransacionService,
    private formBuilder : FormBuilder){
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
      this.transacion.tarjetaOrigen = this.usuario.tarjetas?.filter(t => t.id == parseInt(inputElement.value))[0] || {};
      this.tarjetadSelecionadas = {
        content: [],
        pageable: {
          pageNumber: 0,
          pageSize: 0,
          sort: {
            empty: false,
            sorted: false,
            unsorted: false
          },
          offset: 0,
          paged: false,
          unpaged: false
        },
        last: false,
        totalElements: 0,
        totalPages: 0,
        size: 0,
        number: 0,
        sort: {
          empty: false,
          sorted: false,
          unsorted: false
        },
        numberOfElements: 0,
        first: false,
        empty: false
      }
      this.numeroTarjeta = ""
    }
     cambioInputTarjetaDestino(event : Event){
       const inputElement = event.target as HTMLInputElement;
       this.transacion.tarjetaDestino.id = parseInt(inputElement.value);
     }

    //Busqueda de tarjeta 
    

      tarjetadSelecionadas : Page = {
        content: [],
        pageable: {
          pageNumber: 0,
          pageSize: 0,
          sort: {
            empty: false,
            sorted: false,
            unsorted: false
          },
          offset: 0,
          paged: false,
          unpaged: false
        },
        last: false,
        totalElements: 0,
        totalPages: 0,
        size: 0,
        number: 0,
        sort: {
          empty: false,
          sorted: false,
          unsorted: false
        },
        numberOfElements: 0,
        first: false,
        empty: false
      }
      numeroTarjeta : string = ""
      realizarBusquedaTarjeta(){
          this.transacion.tarjetaDestino = {}
          this.buscarTarjeta(this.numeroTarjeta, this.transacion.tarjetaOrigen.tipoMonedaTarjeta?.tipo || "", this.transacion.tarjetaOrigen.numeroTarjeta || "")
      }
      buscarTarjeta(numeroTarjeta: string, tipoMonedaTarjeta: string, numeroTarjetaExcluida : string){
          this.tarjetaService.getPageByNumeroTarjeta(numeroTarjeta, tipoMonedaTarjeta, numeroTarjetaExcluida).subscribe(data =>{
            this.tarjetadSelecionadas = data
          })
          
      }
      realizarTransaccion(){
        
        this.transacion.monto = parseFloat(this.formMonto.value.monto||"0")
        console.log(this.transacion.monto)
        this.transferenciaService.realizarTransferencia(this.transacion).subscribe({
          next: (data) => {
            this.toastrService.success("Trasaccion Realizada", "Success")
            this.cargarUsuario()
            this.realizarBusquedaTarjeta()
          },
          error: (error) =>{
            console.log(error)
            this.toastrService.error(error.error.mensaje, "Error")
          }
        })
      }
      formMonto!: FormGroup;
      ngOnInit(): void {
        this.formMonto = this.formBuilder.group({
          monto: ['', [Validators.required, Validators.min(1)]]
        });  
      }
      
      
}
