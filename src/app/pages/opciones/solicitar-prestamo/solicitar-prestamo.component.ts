import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBarPrestamoComponent } from "./nav-bar-prestamo/nav-bar-prestamo.component";

@Component({
  selector: 'app-solicitar-prestamo',
  imports: [CommonModule, RouterLink, NavBarPrestamoComponent],
  templateUrl: './solicitar-prestamo.component.html',
  styleUrl: './solicitar-prestamo.component.scss'
})
export class SolicitarPrestamoComponent {
  prestamos = [
    { monto: '5,000.00', meses: '12', fechaInicio: '22/04/2025', fechaFin: '22/04/2026', estado: 'Pagado' },
    { monto: '5,000.00', meses: '48', fechaInicio: '22/01/2025', fechaFin: '22/04/2027', estado: 'Pagado' },
    { monto: '5,000.00', meses: '6', fechaInicio: '22/02/2025', fechaFin: '22/08/2025', estado: 'Activo' }
  ];
  

}
