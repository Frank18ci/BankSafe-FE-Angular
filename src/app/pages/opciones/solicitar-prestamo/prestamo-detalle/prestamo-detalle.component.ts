import { Component } from '@angular/core';
import { NavBarPrestamoComponent } from "../nav-bar-prestamo/nav-bar-prestamo.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prestamo-detalle',
  imports: [NavBarPrestamoComponent, CommonModule],
  templateUrl: './prestamo-detalle.component.html',
  styleUrl: './prestamo-detalle.component.scss'
})
export class PrestamoDetalleComponent {
  prestamo = {
    id: 101,
    montoPrestamo: 15000,
    interes: 5.5,
    plazoMeses: 12,
    fechaInicio: new Date('2024-01-01'),
    fechaFin: new Date('2024-12-31'),
    estadoPrestamo: 'Aprobado',
    fechaRegistro: new Date('2023-12-20'),
    fechaFinalizado: new Date('2024-12-31'),
    estado: true
  };
  prestamos = [
    { monto: '5,000.00', meses: '12', fechaInicio: '22/04/2025', fechaFin: '22/04/2026', estado: 'Pagado' },
    { monto: '5,000.00', meses: '48', fechaInicio: '22/01/2025', fechaFin: '22/04/2027', estado: 'Pagado' },
    { monto: '5,000.00', meses: '6', fechaInicio: '22/02/2025', fechaFin: '22/08/2025', estado: 'Activo' }
  ];
}
