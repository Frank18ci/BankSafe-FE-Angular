import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-configuracion',
  imports: [ReactiveFormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.scss',
})
export class ConfiguracionComponent {
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
          console.log(this.usuarioCargado);
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
    this.cargarUsuario();
  }
  formImagenUpdate = new FormGroup({
    imagen: new FormControl(''),
  });
  formGroupConfiguracion = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl(''),
    correoElectrico: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    numeroDocument: new FormControl(''),
  });

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
