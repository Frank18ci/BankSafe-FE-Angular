import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-solicitar-prestamo',
  imports: [CommonModule],
  templateUrl: './solicitar-prestamo.component.html',
  styleUrl: './solicitar-prestamo.component.scss'
})
export class SolicitarPrestamoComponent {
  prestamos = [
    { titulo1: '5,000.00', titulo2: '12', titulo3: '22/04/2025', titulo4: '22/04/2026', titulo5: 'Pagado' },
    { titulo1: '5,000.00', titulo2: '48', titulo3: '22/01/2025', titulo4: '22/04/2027', titulo5: 'Pagado' },
    { titulo1: '5,000.00', titulo2: '6', titulo3: '22/02/2025', titulo4: '22/08/2025', titulo5: 'Activo' }
  ];
  
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
}
