import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavBarPrestamoComponent } from "./nav-bar-prestamo/nav-bar-prestamo.component";
import { PrestamoService } from '../../../services/Prestamo/prestamo.service';
import { TipoPlazoService } from '../../../services/Prestamo/tipo-plazo.service';
import { Prestamo } from '../../../model/prestamo/prestamo';
import { error } from 'console';
import UserI from '../../../model/UserI';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-solicitar-prestamo',
  imports: [CommonModule, RouterLink, NavBarPrestamoComponent],
  templateUrl: './solicitar-prestamo.component.html',
  styleUrl: './solicitar-prestamo.component.scss'
})
export class SolicitarPrestamoComponent implements OnInit{

  
    usuario: UserI = {}
  
    cargarUsuario(){
      const data : UserI = JSON.parse(this.cookieService.get('user'))
      if(data){
        this.userService.findI(data.id ? data.id : 0).subscribe((data: any) => {
          if(data){
      this.cookieService.set('user', JSON.stringify(data), {
        path: '/',
        });
        this.usuario = data;
        this.cargarPrestamosdeUsuario()
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

  constructor(private PrestamoService: PrestamoService,
    private tipoPlazoService: TipoPlazoService,
    private cookieService: CookieService,
    private userService: UsuarioService,
    private router: Router,
    private toastrService: ToastrService
  ){}
  ngOnInit(): void {
    this.cargarUsuario();
    
  }
  cargarPrestamosdeUsuario(){
    this.PrestamoService.getPrestamosByIdUsuario(this.usuario.id || 0).subscribe({
      next: data => {this.prestamos = data},
      error: error => {this.toastrService.error("Fallo al cargar los prestamos del usuario", "Error")}
    })
  }
  prestamos : Prestamo[] = []; 
  

}
