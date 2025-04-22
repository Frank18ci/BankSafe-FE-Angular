import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-transferencia',
  imports: [FormsModule, CommonModule],
  selector: 'app-transferencia',
  imports: [ReactiveFormsModule],
  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.scss'
})
export class TransferenciaComponent {
  tarjetaSeleccionada: string = ''; 
  tarjetaSeleccionadaBoton: string = '';
  tarjetas = [
    { moneda: 'Libras (GBP)', simbolo: '£', monto: 500, valor: 'GBP1' }
  ];
}
