import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import tipoDocumentoUser from '../../../model/TipoDocumentoUser';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  listaTipoDocumentoUser : tipoDocumentoUser[] = []


  constructor(private apiService: AuthService,
    private toastr: ToastrService
  ){
    apiService.loadTipoDocumento().subscribe(lista =>{
      this.listaTipoDocumentoUser = lista
    })
  }
  loginForm  = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  user = {numeroTarjeta : '', claveInternet: ''}
  login(){
    this.user.numeroTarjeta = this.loginForm.value.username != null ? this.loginForm.value.username : ""
    this.user.claveInternet = this.loginForm.value.password != null ? this.loginForm.value.password : ""

    this.apiService.login(this.user).subscribe(((data: any) =>{
        console.log(data)
        this.toastr.success(data.Message, data.Username, data.token);
    }))
  }

}
