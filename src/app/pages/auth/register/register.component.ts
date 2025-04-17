import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TipoDocumentoUserService } from '../../../services/tipoDocumentoUser/tipo-documento-user.service';
import tipoDocumentoUser from '../../../model/TipoDocumentoUser';
import { TipoMonedaTarjetaService } from '../../../services/tipoMonedaTarjeta/tipo-moneda-tarjeta.service';
import { TipoTarjetaService } from '../../../services/tipoTarjeta/tipo-tarjeta.service';
import TipoMonedaTarjeta from '../../../model/TipoMonedaTarjeta';
import TipoTarjeta from '../../../model/TipoTarjeta';
import User from '../../../model/User';
import RoleUser from '../../../model/RoleUser';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import Tarjeta from '../../../model/Tarjeta';
import { TarjetaService } from '../../../services/Tarjeta/tarjeta.service';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  tipoDocumentoUserService = inject(TipoDocumentoUserService);
  tipoMonedaTarjetaService = inject(TipoMonedaTarjetaService);
  tipoTarjetaService = inject(TipoTarjetaService);
  userService = inject(UsuarioService);
  tarjetaService = inject(TarjetaService);
  toastService = inject(ToastrService)
  
  router = inject(Router)
  listaTipoDocumentoUser: tipoDocumentoUser[] = [];
  listTipoMonedaTarjeta: TipoMonedaTarjeta[] = [];
  listTipoTarjeta: TipoTarjeta[] = [];

  constructor() {
    this.tipoDocumentoUserService.list().subscribe((data) => {
      if (data) this.listaTipoDocumentoUser = data;
    });
    this.tipoMonedaTarjetaService.list().subscribe((data) => {
      if (data) this.listTipoMonedaTarjeta = data;
    });
    this.tipoTarjetaService.list().subscribe((data) => {
      if (data) this.listTipoTarjeta = data;
    });
  }

  formRegisterUserTarjeta = new FormGroup({
    tipoDocumento: new FormControl(0, Validators.required),
    numeroDocumento: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl('', Validators.required),
    tipoTarjeta: new FormControl('', Validators.required),
    tipoMoneda: new FormControl('', Validators.required),
    numeroTarjeta: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required),
  });

  convertFormGroudToTarjeta(fru: FormGroup): Tarjeta {
    const tarjeta: Tarjeta = {
      user: {
        numeroDocumento: fru.value.numeroDocumento,
        nombres: fru.value.nombres,
        apellidos: fru.value.apellidos,
        fechaNacimiento: fru.value.fechaNacimiento,
        tipoDocumentoUser: {
          id: fru.value.tipoDocumento,
        } as tipoDocumentoUser,
      },
      claveInternet: fru.value.clave,
      numeroTarjeta: fru.value.numeroTarjeta,
      tipoMonedaTarjeta: {
        id: fru.value.tipoMoneda,
      } as TipoMonedaTarjeta,
      tipoTarjeta: {
        id: fru.value.tipoTarjeta,
      } as TipoTarjeta,
    };
    return tarjeta;
  }
  
  saveUserTarjeta() {
    const tarjeta: Tarjeta = this.convertFormGroudToTarjeta(
      this.formRegisterUserTarjeta
    );
    console.log('Datos guardos enviados', tarjeta);
    this.tarjetaService.save(tarjeta).subscribe((data) => {
      console.log('Datos guardos regresados', data);
	    this.router.navigate(['auth/login'])
      this.toastService.success( "ok", "Cuenta Registrada")
    });
  }
}
