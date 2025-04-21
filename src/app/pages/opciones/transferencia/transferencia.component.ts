import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-transferencia',
  imports: [ReactiveFormsModule],
  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.scss'
})
export class TransferenciaComponent {
  formRegistroTransferencia = new FormGroup({
      nombre: new FormControl("", Validators.min(10))    
  })
  subirNombre(){
    this.nombre = this.formRegistroTransferencia.value.nombre || ""
  }
  nombre = "aa"
}
