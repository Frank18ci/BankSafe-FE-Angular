import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private apiService: AuthService,
    private toastr: ToastrService
  ){

  }
  loginForm  = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  user = {username : '', password: ''}
  login(){
    this.user.username = this.loginForm.value.username != null ? this.loginForm.value.username : ""
    this.user.password = this.loginForm.value.password != null ? this.loginForm.value.password : ""

    this.apiService.login(this.user).subscribe(((data: any) =>{
        console.log(data)
        this.toastr.success(data.Message, data.Username, data.token);
    }))
  }
}
