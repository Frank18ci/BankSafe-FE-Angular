import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { TipoMonedaTarjetaService } from '../../../services/tipoMonedaTarjeta/tipo-moneda-tarjeta.service';
import TipoMonedaTarjeta from '../../../model/TipoMonedaTarjeta';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import UserI from '../../../model/UserI';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Tarjeta from '../../../model/Tarjeta';

@Component({
  selector: 'app-cambiar-moneda',
  imports: [NgbDatepickerModule, ReactiveFormsModule],
  templateUrl: './cambiar-moneda.component.html',
  styleUrl: './cambiar-moneda.component.scss'
})
export class CambiarMonedaComponent implements AfterViewInit{
  tipoMonedaService = inject(TipoMonedaTarjetaService)
  private userService = inject(UsuarioService);
  tipoMonedas : TipoMonedaTarjeta[] = []
  router = inject(Router)
  cookieService = inject(CookieService);

  modalService = inject(NgbModal)
  closeResult: WritableSignal<string> = signal('');

  formGroupTarjetaSelected = new FormGroup({
    idtarjeta: new FormControl()
  })
  formGroupConvertir = new FormGroup({
    monto: new FormControl(),
    tipo: new FormControl(),
  })

  tarjetaSeleccionada : Tarjeta | undefined = {}
  seleccionarTarjeta(){
    this.tarjetaSeleccionada = this.usuario.tarjetas?.filter(t =>t.id == this.formGroupTarjetaSelected.value.idtarjeta)[0];
    console.log(this.tarjetaSeleccionada)
    this.cargarTipoMoneda(this.tarjetaSeleccionada?.tipoMonedaTarjeta?.simbolo || "")
    this.modalService.dismissAll()
  }
  @ViewChild('content') content!:TemplateRef<any>
  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult.set(`Closed with: ${result}`);
			},
			(reason) => {
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
  ngAfterViewInit(): void {
    this.cargarUsuario();
    this.open(this.content)
    //this.cargarContenido();
  }
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
  cargarContenido(){
    this.tipoMonedaService.list().subscribe(data =>{
      this.tipoMonedas = data
    })
  }
  cargarTipoMoneda(tipo: String){
    this.tipoMonedaService.listaByTipe(tipo).subscribe(data =>{
      this.tipoMonedas = data
    })
  }
  resultado =  0

  convertir(){
    const valorConversion = this.tipoMonedas.filter(t => t.tipo ==this.formGroupConvertir.value.tipo)[0].valor
    this.resultado = this.formGroupConvertir.value.monto * valorConversion
  }
  constructor(){
    
  }
}
