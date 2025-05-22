import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import User from '../../../model/User';
import { CookieService } from 'ngx-cookie-service';
import UserI from '../../../model/UserI';
import { Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { CardTarjetaComponent } from "../../../components/card/card-tarjeta/card-tarjeta.component";

@Component({
  selector: 'app-configuracion',
  imports: [ReactiveFormsModule, CardTarjetaComponent],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.scss',
})
export class ConfiguracionComponent implements OnInit {
  toastrService = inject(ToastrService);
  userService = inject(UsuarioService);
  cookieService = inject(CookieService);
  

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
          this.cargarUsuarioEnFormulario()
          
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
  constructor(private router: Router) {
    
  }
  formImagenUpdate = new FormGroup({
    imagen: new FormControl(''),
  });
  formGroupConfiguracion = new FormGroup({
    nombres: new FormControl(this.usuarioCargado.nombres, Validators.required),
    apellidos: new FormControl('', Validators.required),
    correoElectrico: new FormControl('', [Validators.required, Validators.email]),
    fechaNacimiento: new FormControl('', [Validators.required]),
    numeroDocument: new FormControl('', Validators.required),
    });
  ngOnInit(): void {
    this.cargarUsuario();

    
  }
  cargarUsuarioEnFormulario() {
    const usuarioCargado = {
      nombres: this.usuarioCargado.nombres,
      apellidos: this.usuarioCargado.apellidos,
      correoElectrico: this.usuarioCargado.correo,
      fechaNacimiento: this.usuarioCargado.fechaNacimiento,
      numeroDocument: this.usuarioCargado.numeroDocumento,
    }
    console.log(this.usuarioCargado);
    console.log(usuarioCargado);
    this.formGroupConfiguracion.patchValue(usuarioCargado);
  }

  pathImg: string = '';
  selectedFile: File = new File([], '');
  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = event.target.files[0];
    if (this.selectedFile && input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.pathImg = URL.createObjectURL(this.selectedFile);
    }
  }
  upLoadImagen(u: User) {
    const formData = new FormData();
    formData.append('imagen', this.selectedFile);

    formData.append('id', String(u.id ?? ''));
    formData.append('numeroDocumento', u.numeroDocumento || '');
    formData.append('nombres', u.nombres || '');
    formData.append('apellidos', u.apellidos || '');
    formData.append('fechaNacimiento', u.fechaNacimiento || '');
    formData.append('correo', u.correo || '');
    this.userService.uploadUserImage(formData).subscribe({
      next: (res: any) => {
        this.toastrService.success(
          'Datos actualizados correctamente',
          'Success'
        );
      },
      error: (err: any) => {
        this.toastrService.error('Fallo al actualizar', 'Error');
      },
    });
  }

  modificarUsuario() {
    const usuario: User = {};
    usuario.id = this.usuarioCargado.id;
    usuario.nombres = this.formGroupConfiguracion.value.nombres || '';
    usuario.apellidos = this.formGroupConfiguracion.value.apellidos || '';
    usuario.correo = this.formGroupConfiguracion.value.correoElectrico || '';
    usuario.fechaNacimiento =
      this.formGroupConfiguracion.value.fechaNacimiento || '';
    usuario.numeroDocumento =
      this.formGroupConfiguracion.value.numeroDocument || '';

    this.upLoadImagen(usuario);
  }
}
