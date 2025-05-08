import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../../../services/Prestamo/prestamo.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Empresa } from '../../../model/servicio/Empresa';
import { EmpresaService } from '../../../services/empresa/empresa.service';
import { PagoServicio } from '../../../model/servicio/PagoServicio';
import { PagoServicioService } from '../../../services/pagoServicio/pago-servicio.service';
import UserI from '../../../model/UserI';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Tarjeta from '../../../model/Tarjeta';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pago-de-servicios',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pago-de-servicios.component.html',
  styleUrl: './pago-de-servicios.component.scss'
})
export class PagoDeServiciosComponent implements OnInit {
  constructor(
    private empresaService : EmpresaService,
    private pagoServicioService : PagoServicioService,
    private usuarioService : UsuarioService,
    private cookieService : CookieService,
    private router : Router,
    private toastrService: ToastrService,
  ) { }

  //Cargar datos del usuario
  usuario: UserI = {}
 cargarUsuario(){
      const data : UserI = JSON.parse(this.cookieService.get('user'))
      if(data){
        this.usuarioService.findI(data.id ? data.id : 0).subscribe({
          next: (data: any) => {
          if(data){
      this.cookieService.set('user', JSON.stringify(data), {
        path: '/',
        });
        this.usuario = data;
        this.asignarTarjetasSoles()
      } else{
      this.removerCookies()
      }
        }, error: (error) => {
          error.type === 403 ? this.removerCookies() : console.log(error)
        }});
      }
    }
    removerCookies(){
      this.cookieService.delete("user")
      this.cookieService.delete("username")
      this.cookieService.delete("token")
      this.router.navigate(['auth/login'])
    }

  ngOnInit(): void {
    this.buscarEmpresas()  
    this.cargarUsuario()
  }
  buscarEmpresas(){
    this.empresaService.getEmpresas().subscribe({
      next: data => {
        this.empresasOpciones = data
        this.todasLasEmpresas = data
        this.empresasOpciones = this.empresasOpciones.slice(0, 3);
      }
    })
  }
  todasLasEmpresas : Empresa[] = []
  empresasOpciones : Empresa[] = []
  valorBusqueda = ""
  empresas: Empresa[] = []
  realizarBusquedaEmpresa(){
    this.empresaBuscadaValida = false
    this.buscarEmpresa(this.valorBusqueda, this.valorBusqueda)  
  }
  buscarEmpresa(nombre: string, tipoEmpresaDescripcion: string){
    this.empresaService.getEmpresaByNombreAndTipoEmpresaDescripcion(nombre, tipoEmpresaDescripcion).subscribe({
      next: data => {
        this.empresas = data
      }
    })
  }
  empresaBuscadaValida : boolean = false
  empresaBuscada : string = ""
  buscarEmpresaSeleccionada(){
    this.empresaBuscadaValida = this.todasLasEmpresas
    .some(empresa => empresa.nombre + " - " + empresa.tipoEmpresa?.descripcion === this.valorBusqueda)
    if(this.empresaBuscadaValida)
      this.empresaBuscada = this.valorBusqueda
    else
      this.empresaBuscada = ""
  }

  asignarEmpresaDeOpciones(event : Event){
    const option = event.target as HTMLButtonElement;
    const value = option.textContent?.trim() || '';
    this.valorBusqueda = value;

    this.buscarEmpresaSeleccionada()
    
  }
  codigoBuscar: string = ""
  pagoServicios : PagoServicio[] = []
  busquedaPorCodigoServicio(){
    this.pagoServicioService.getPagosServicioByCodigoAndEstado(this.codigoBuscar, "Pendiente").subscribe({
      next: data => {
        this.pagoServicios = data
        this.verificarSiHayPagosPendientes()
      }
    })
  }
  hayPagosPendientes : boolean = false
  verificarSiHayPagosPendientes(){
    if(this.pagoServicios.length > 0){
      this.hayPagosPendientes = true
    } else{
      this.hayPagosPendientes = false
    }
  }

  tarjetasSoles : Tarjeta[] = []
  asignarTarjetasSoles(){
    this.tarjetasSoles = this.usuario.tarjetas?.filter(tarjeta => tarjeta.tipoMonedaTarjeta?.simbolo === "PEN") || []
  }

  tarjetaParaPagar : Tarjeta = {}
  pagoSeleccionado : PagoServicio = {}
  pagarServicio(pagoSeleccionado : PagoServicio){
    this.pagoSeleccionado = pagoSeleccionado
    if(!this.tarjetaParaPagar.id){
      this.toastrService.error("Seleccione una tarjeta", "Error")
    } else {
      this.pagoServicioService.realizarPagoServicio(this.pagoSeleccionado, this.tarjetaParaPagar.id || 0).subscribe({
        next: data => {
          this.toastrService.success("Pago realizado correctamente", "Success")

          this.pagoSeleccionado = {}
          this.tarjetaParaPagar = {}

          this.cargarUsuario()
          this.buscarEmpresas()
          
          this.codigoBuscar = ""
          this.pagoServicios = []
        },
        error: error => {
          if(error.status === 403){
            this.toastrService.error("No tienes permisos para realizar esta acción", "Error")
            this.removerCookies()
          } else{
            this.toastrService.error("Error al realizar el pago", "Error")
          }
        }
      })
    }
  }

}
