import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-beneficios-y-promociones',
  imports: [CommonModule],
  templateUrl: './beneficios-y-promociones.component.html',
  styleUrl: './beneficios-y-promociones.component.scss'
})
export class BeneficiosYPromocionesComponent {
  beneficios: string[] = [
    'Cero comisiones en cuentas de ahorro y corrientes durante el primer año.',
    'Apertura 100% digital en menos de 5 minutos.',
    'Atención personalizada 24/7 a través de llamada.',
    'Tarjetas sin costo de emisión ni mantenimiento',
    'Transferencias nacionales gratuitas e ilimitadas.',
    'Red de cajeros compartida sin costo adicional.',
    'Aplicación móvil moderna y fácil de usar, con control total de tus productos.',
    'Acceso anticipado a productos financieros exclusivos.'
  ];

  promociones: string[] = [
    '💸 Bono de bienvenida: recibe S/50 (o monto equivalente) al abrir tu cuenta y realizar tu primer depósito.',
    '📱 Sorteos mensuales por usar la app (como vales de consumo o gadgets).',
    '🎁 Invita y gana: recibe beneficios por cada amigo que abra una cuenta con tu código.',
    '🚀 Tasa de interés promocional en cuentas de ahorro durante los primeros 6 meses.',
    '💳 Cashback del 5% en tus compras del primer mes con tu tarjeta de débito/crédito.'
  ];
}
