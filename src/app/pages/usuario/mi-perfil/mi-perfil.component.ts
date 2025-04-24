import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTarjetaComponent } from '../../../components/card/card-tarjeta/card-tarjeta.component';
import UserI from '../../../model/UserI';

@Component({
  selector: 'app-mi-perfil',
  imports: [CommonModule],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.scss'
})
export class MiPerfilComponent {
  usuario = {
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    foto: 'assets/images/default-profile.png'
  };

  tarjetas = [
    { tipo: 'Visa', ultimosDigitos: '1234' },
    { tipo: 'MasterCard', ultimosDigitos: '5678' }
  ];

  actividades = [
    'Realizaste una transferencia de $500',
    'Pagaste tu tarjeta de crédito',
    'Recibiste un depósito de $1,000'
  ];
  trackById(index: number, item: any): number {
    return item.id; // Asegúrate de que cada tarjeta tenga un campo `id`
  }
}
