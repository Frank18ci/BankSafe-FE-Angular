import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitar-tarjeta',
  templateUrl: './solicitar-tarjeta.component.html',
  imports: [
    ReactiveFormsModule,CommonModule
  ],
  styleUrls: ['./solicitar-tarjeta.component.scss']
})
export class SolicitarTarjetaComponent implements OnInit {
  tarjetas = [
    { tipo: 'Visa', ultimosDigitos: '1234', transacciones: 15 },
    { tipo: 'MasterCard', ultimosDigitos: '5678', transacciones: 8 },
    { tipo: 'American Express', ultimosDigitos: '9012', transacciones: 20 }
  ];

  formularioTarjeta: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formularioTarjeta = this.fb.group({
      tipo: ['', Validators.required],
      limite: ['', [Validators.required, Validators.min(1000)]]
    });
  }

  ngOnInit(): void {}

  solicitarTarjeta(): void {
    if (this.formularioTarjeta.valid) {
      const nuevaTarjeta = this.formularioTarjeta.value;
      console.log('Formulario válido:', nuevaTarjeta);
      const ultimosDigitos = Math.floor(1000 + Math.random() * 9000).toString();
      this.tarjetas.push({
        tipo: nuevaTarjeta.tipo,
        ultimosDigitos,
        transacciones: 0
      });
      console.log('Nueva tarjeta agregada:', this.tarjetas);
      this.formularioTarjeta.reset();
    } else {
      console.log('Formulario inválido');
    }
  }
}