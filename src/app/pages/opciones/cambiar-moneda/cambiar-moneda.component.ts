import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { TipoMonedaTarjetaService } from '../../../services/tipoMonedaTarjeta/tipo-moneda-tarjeta.service';
import TipoMonedaTarjeta from '../../../model/TipoMonedaTarjeta';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import UserI from '../../../model/UserI';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Tarjeta from '../../../model/Tarjeta';
import { Page } from '../../../model/Page';
import { TarjetaService } from '../../../services/Tarjeta/tarjeta.service';
import Transaccion from '../../../model/Transaccion';
import { TransacionService } from '../../../services/transacion/transacion.service';
import { ToastrService } from 'ngx-toastr';
import TransaccionConversionMoneda from '../../../model/TransaccionConversionMoneda';
import { CommonModule } from '@angular/common';
import { CardTarjetaComponent } from "../../../components/card/card-tarjeta/card-tarjeta.component";

@Component({
  selector: 'app-cambiar-moneda',
  imports: [NgbDatepickerModule, FormsModule, ReactiveFormsModule, CommonModule, CardTarjetaComponent],
  templateUrl: './cambiar-moneda.component.html',
  styleUrl: './cambiar-moneda.component.scss'
})
export class CambiarMonedaComponent implements AfterViewInit{
  tipoMonedaService = inject(TipoMonedaTarjetaService)
  tarjetaService = inject(TarjetaService)
  private userService = inject(UsuarioService);
  tipoMonedas : TipoMonedaTarjeta[] = []
  router = inject(Router)
  cookieService = inject(CookieService);
  transacionService = inject(TransacionService)
  modalService = inject(NgbModal)
  toastrService = inject(ToastrService)
  closeResult: WritableSignal<string> = signal('');

  formGroupTarjetaSelected = new FormGroup({
    idtarjeta: new FormControl()
  })
  formGroupConvertir = new FormGroup({
    monto: new FormControl('', [Validators.required, Validators.min(1)]),
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
		this.modalService.open(content, {  ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
     }).result.then(
			(result) => {
				this.closeResult.set(`Closed with: ${result}`);
			},
			(reason) => {
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
			},
		);
	}
  numeroTarjetaBusqueda : string = ""
  realizarBusquedaTarjeta(){
    this.transferenciaARealizar.tarjetaDestino = {}
          this.buscarTarjeta(this.numeroTarjetaBusqueda, this.formGroupConvertir.value.tipo || "", this.tarjetaSeleccionada?.numeroTarjeta || "")
  }
  buscarTarjeta(numeroTarjeta: string, tipoMonedaTarjeta: string, numeroTarjetaExcluida : string){
    console.log('numeroTarjeta', numeroTarjeta)
    console.log('tipoMonedaTarjeta', tipoMonedaTarjeta)
    console.log('numeroTarjetaExcluida', numeroTarjetaExcluida)
    this.tarjetaService.getPageByNumeroTarjeta(numeroTarjeta, tipoMonedaTarjeta, numeroTarjetaExcluida).subscribe(data =>{
      this.tarjetadSelecionadas = data
      console.log(data)
    })
    
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
    this.cargarContenido();
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
  resultado : string =  ""

  convertir(){
    const valorConversion = this.tipoMonedas.filter(t => t.tipo ==this.formGroupConvertir.value.tipo)[0].valor
    this.resultado = ((Number(this.formGroupConvertir.value.monto) || 0) * (valorConversion || 0)).toFixed(2)
  }

  transferenciaARealizar : TransaccionConversionMoneda = {
    id: 0,
    montoTarjetaOrigen: 0,
    montoTarjetaDestino: 0,
    tipoTransacion: {
      id: 0,
      tipo: ''
    },
    tarjetaOrigen: {},
    tarjetaDestino: {}
  }
  //Buscar tarjeta seccion
  cambioInput(event : Event){
    const inputElement = event.target as HTMLInputElement;
    this.transferenciaARealizar.tarjetaDestino.id = parseInt(inputElement.value);
    console.log(this.transferenciaARealizar)
  }

  @ViewChild('numeroTarjetaB') numeroTarjetaB!:ElementRef<HTMLInputElement>
  tarjetadSelecionadas : Page = {
    content: [],
    pageable: {
      pageNumber: 0,
      pageSize: 0,
      sort: {
        empty: false,
        sorted: false,
        unsorted: false
      },
      offset: 0,
      paged: false,
      unpaged: false
    },
    last: false,
    totalElements: 0,
    totalPages: 0,
    size: 0,
    number: 0,
    sort: {
      empty: false,
      sorted: false,
      unsorted: false
    },
    numberOfElements: 0,
    first: false,
    empty: false
  }

  //funcion de realizar transferencia 
  formGroupTarjetaDestino = new FormGroup({
    tarjetaId : new FormControl()
  })

  realizarTransferencia(){
    
    if(this.tarjetaSeleccionada){
      this.transferenciaARealizar.tarjetaOrigen = this.tarjetaSeleccionada
    }
    this.transferenciaARealizar.montoTarjetaOrigen =  Number(this.formGroupConvertir.value.monto)
    this.transferenciaARealizar.montoTarjetaDestino = parseFloat(this.resultado)
    console.log(this.transferenciaARealizar)
    this.transacionService.realizarCambioyTransferencia(this.transferenciaARealizar).subscribe(data =>{
      console.log("Resutado", data)
      this.toastrService.success("Enviado" , "Transacion")
      
      this.formGroupConvertir.reset()
      this.resultado = ""
      this.numeroTarjetaBusqueda = ""
      this.tarjetadSelecionadas = {
        content: [],
        pageable: {
          pageNumber: 0,
          pageSize: 0,
          sort: {
            empty: false,
            sorted: false,
            unsorted: false
          },
          offset: 0,
          paged: false,
          unpaged: false
        },
        last: false,
        totalElements: 0,
        totalPages: 0,
        size: 0,
        number: 0,
        sort: {
          empty: false,
          sorted: false,
          unsorted: false
        },
        numberOfElements: 0,
        first: false,
        empty: false
      }
    }, error => {
      this.toastrService.error("Mal" ,error)
    })
  }

  constructor(){
  }
}
