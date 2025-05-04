import { Component, OnInit } from '@angular/core';
import { NavBarPrestamoComponent } from "../nav-bar-prestamo/nav-bar-prestamo.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardTarjetaComponent } from "../../../../components/card/card-tarjeta/card-tarjeta.component";
import UserI from '../../../../model/UserI';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TipoPlazo } from '../../../../model/prestamo/tipo-plazo';
import { TipoPlazoService } from '../../../../services/Prestamo/tipo-plazo.service';
import { ToastrService } from 'ngx-toastr';
import { Prestamo } from '../../../../model/prestamo/prestamo';
import { PrestamoService } from '../../../../services/Prestamo/prestamo.service';
import User from '../../../../model/User';

@Component({
  selector: 'app-solicitar',
  imports: [NavBarPrestamoComponent, ReactiveFormsModule, CommonModule, CardTarjetaComponent],
  templateUrl: './solicitar.component.html',
  styleUrl: './solicitar.component.scss'
})
export class SolicitarComponent implements OnInit{
  
  constructor(private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private usuarioService: UsuarioService,
    private router: Router,
    private tipoPlazoService: TipoPlazoService,
    private toastrService: ToastrService,
    private prestamoService: PrestamoService
  ){

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
          this.prestamo.user.id = this.usuario.id || 0;
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
      prestamo : Prestamo = {
        user: {

        },
        tarjetaRecepcion: {

        }
      };
  prestamoFormGroup! : FormGroup; 
  ngOnInit(): void {
    this.cargarUsuario()
    this.cargarPlazos()
    this.prestamoFormGroup = this.formBuilder.group({
      monto: [this.prestamo.monto, [Validators.required, Validators.min(1)]],
      tipoPlazo: [this.prestamo.tipoPlazo, Validators.required],
      plazos: [this.prestamo.plazos, [Validators.required, Validators.min(1)]],
      fechaInicio: [this.prestamo.fechaInicio, Validators.required]
    });
  }

  cambioInput(event : Event){
    const inputElement = event.target as HTMLInputElement;
    this.prestamo.tarjetaRecepcion = this.usuario.tarjetas?.filter(t => t.id == parseInt(inputElement.value))[0] || {};
    console.log(this.prestamo)
  }
  cargarPlazos(){
    this.tipoPlazoService.getTipoPlazos().subscribe({
      next: data => this.tipoPlazos = data,
      error: error => this.toastrService.error(error.message, "Error")
    })
  }
  tipoPlazos : TipoPlazo[] = []
  solicitarPrestamo(){
    if (!this.prestamo.user) {
      this.prestamo.user = {} as User;
    }
    
    
    
    this.prestamoService.savePrestamo(this.prestamo).subscribe({
      next: data => {
        console.log(data)
        this.toastrService.error("Hecho", "Biem")
      },
      error: error => {
        this.toastrService.error(error, "Error")
      }    
    })
  }
  calcularPrestamo(){
    this.prestamo.monto = this.prestamoFormGroup.value.monto
    this.prestamo.tipoPlazo = this.prestamoFormGroup.value.tipoPlazo
    this.prestamo.plazos = this.prestamoFormGroup.value.plazos
    this.prestamo.fechaInicio = this.prestamoFormGroup.value.fechaInicio
    
    this.prestamoService.precalculoprestamo(this.prestamo).subscribe({
      next: data => {
        this.prestamo = data
        console.log(this.prestamo)
        this.fechaFin = new Date(this.prestamo.fechaFin!).toLocaleDateString("es-Pe") || "";
      }
    })
  }
  fechaFin = ""
}
