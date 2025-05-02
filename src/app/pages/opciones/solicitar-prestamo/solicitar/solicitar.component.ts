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
    private toastrService: ToastrService
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
      prestamo! : Prestamo;
  prestamoFormGroup! : FormGroup; 
  ngOnInit(): void {
    this.cargarUsuario()
    this.cargarPlazos()
    this.prestamoFormGroup = this.formBuilder.group({
      monto: (this.prestamo.monto, [Validators.required, Validators.min(1)]),

    })  
  }
  get monto(){
    return this.prestamoFormGroup.get('monto')
  }
  cambioInput(event : Event){
    const inputElement = event.target as HTMLInputElement;
  }
  cargarPlazos(){
    this.tipoPlazoService.getTipoPlazos().subscribe({
      next: data => this.tipoPlazos = data,
      error: error => this.toastrService.error(error.message, "Error")
    })
  }
  tipoPlazos : TipoPlazo[] = []
  solicitarPrestamo(){
    console.log(this.prestamoFormGroup.value.monto)
  }
}
