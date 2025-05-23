import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CardTarjetaComponent } from '../card-tarjeta/card-tarjeta.component';
import { ActivatedRoute } from '@angular/router';
import Tarjeta from '../../../model/Tarjeta';
import { TarjetaService } from '../../../services/Tarjeta/tarjeta.service';
import { ToastrService } from 'ngx-toastr';
import { TransacionService } from '../../../services/transacion/transacion.service';
import Transaccion from '../../../model/Transaccion';
import { Chart, registerables } from 'chart.js/auto';
Chart.register(...registerables);
@Component({
  selector: 'app-card-detail',
  imports: [CardTarjetaComponent, CommonModule],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss',
})
export class CardDetailComponent {
  @ViewChild('myChart', { static: false }) myChart!: ElementRef;
  @ViewChild('myChart2', { static: false }) myChart2!: ElementRef;
  numeroTarjeta = '';
  tarjetaSeleccionada: Tarjeta = {};
  constructor(
    private readonly route: ActivatedRoute,
    private readonly tarjetaService: TarjetaService,
    private readonly toastrService: ToastrService,
    private readonly transacionService: TransacionService
  ) {
    this.route.params.subscribe((p) => {
      this.numeroTarjeta = p['numeroTarjeta'];
      this.buscarTransacciones();
    });

    this.tarjetaService.findByNumeroTarjeta(this.numeroTarjeta).subscribe({
      next: (data) => {
        this.tarjetaSeleccionada = data;
      },
      error: (error) => {
        this.toastrService.error(error);
      },
    });

    this.transacionService
      .solicitarTransferenciasFechasNumeroTarjetaEnvioUltimoMes(
        this.numeroTarjeta
      )
      .subscribe({
        next: (data) => {
          this.transacionesMesAnterior = data;
          this.calcularPorcentajeMesAnterior(this.transacionesMesAnterior)
        },
        error: (error) => {
          console.log(error);
        },
      });
    this.transacionService
      .solicitarTransferenciasFechasNumeroTarjetaEnvioActualMes(
        this.numeroTarjeta
      )
      .subscribe({
        next: (data) => {
          this.transacionesMesActual = data;
          this.calcularPorcentajeMesAnteriorMesActual(this.transacionesMesActual);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  buscarTransacciones() {
    this.transacionService
      .solicitarTransferenciasFechasNumeroTarjetaEnvio(this.numeroTarjeta)
      .subscribe({
        next: (data) => {
          this.transaciones = data;
          
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  gastoMesAnterior = 0;
  gastoMesActual = 0;
  porcentajeMesAnteriorN = 0;
  porcentajeMesActualN = 0;
  porcentajeMesAnterior = '';
  porcentajeMesActual = '';
  calcularPorcentajeMesAnterior(trasaciones: Transaccion[]) {
    
    if(trasaciones.length > 0){
      this.gastoMesAnterior = trasaciones
      .map((t) => t.monto)
      .reduce((acc, monto) => acc + monto, 0);
    this.porcentajeMesAnteriorN =
      ((this.gastoMesAnterior * 100) / (trasaciones[0].tarjetaOrigen.monto || 0))
    this.porcentajeMesAnterior = this.porcentajeMesAnteriorN.toFixed(2) + '%';
    } else {
      this.gastoMesAnterior = 0
      this.porcentajeMesAnterior = "0%"
    }
    this.cargarDesiongMesAnterior(this.porcentajeMesAnterior, this.porcentajeMesAnteriorN)
  }
  calcularPorcentajeMesAnteriorMesActual(trasaciones: Transaccion[]) {
    
    if(trasaciones.length > 0){
      this.gastoMesActual = trasaciones
      .map((t) => t.monto)
      .reduce((acc, monto) => acc + monto, 0);
    this.porcentajeMesActualN =
      ((this.gastoMesActual * 100) / (trasaciones[0].tarjetaOrigen.monto || 0))
    this.porcentajeMesActual = this.porcentajeMesActualN.toFixed(2) + '%';
    }else{
      this.gastoMesActual = 0
      this.porcentajeMesActual = "0%"
    }
    this.cargarDesingMesActual(this.porcentajeMesActual, this.porcentajeMesActualN)
  }
  transaciones: Transaccion[] = [];
  transacionesMesAnterior: Transaccion[] = [];
  transacionesMesActual: Transaccion[] = [];
  date = new Date();
  getMesOfNumber(n: number): string {
    switch (n) {
      case 0:
        return 'Ene';
      case 1:
        return 'Feb';
      case 2:
        return 'Mar';
      case 3:
        return 'Abr';
      case 4:
        return 'May';
      case 5:
        return 'Jun';
      case 6:
        return 'Jul';
      case 7:
        return 'Ago';
      case 8:
        return 'Sep';
      case 9:
        return 'Oct';
      case 10:
        return 'Nov';
      case 11:
        return 'Dic';
      default:
        return 'Mes no válido';
    }
  }
  cargarDesiongMesAnterior(porcenta: string, valorPorcentaje: number){
    const valorPG = 100 - valorPorcentaje;
    const valorPGrestante = valorPorcentaje
    const porcentajeMesAnterior = porcenta;
    const ctx = this.myChart.nativeElement.getContext('2d');
    const mesAnteriorTexto = this.getMesOfNumber(this.date.getMonth() - 1);
    const centerTextPluginMounthPasado = {
      id: 'centerText',
      beforeDraw(chart: any) {
        const { width, height, ctx } = chart;
        ctx.save();

        const centerX = width / 2;
        const centerY = height / 2;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(mesAnteriorTexto, centerX, centerY - 10);

        ctx.font = '14px sans-serif';
        ctx.fillText(
          `${porcentajeMesAnterior} de Total`,
          centerX,
          centerY + 12
        );

        ctx.restore();
      },
    };
    

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [valorPG, valorPGrestante],
            backgroundColor: ['#2669D2', '#2669D222'],
            rotation: 140,
            weight: 0.6,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: '70%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      },
      plugins: [centerTextPluginMounthPasado],
    });
    
  }
  cargarDesingMesActual(porcenta: string, valorPorcentaje: number){
    const valorPG = 100 - valorPorcentaje;
    const valorPGrestante = valorPorcentaje
    const porcentajeMesActual = porcenta;
    const mesActualTexto = this.getMesOfNumber(this.date.getMonth());
    
    const centerTextPluginMounthActual = {
      id: 'centerText',
      beforeDraw(chart: any) {
        const { width, height, ctx } = chart;
        ctx.save();

        const centerX = width / 2;
        const centerY = height / 2;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(mesActualTexto, centerX, centerY - 10);

        ctx.font = '14px sans-serif';
        ctx.fillText(`${porcentajeMesActual} de Total`, centerX, centerY + 12);

        ctx.restore();
      },
    };
    const ctx2 = this.myChart2.nativeElement.getContext('2d');
    new Chart(ctx2, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [valorPG, valorPGrestante],
            backgroundColor: ['#2669D2', '#2669D222'],
            rotation: 140,
            weight: 0.6,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: '70%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      },
      plugins: [centerTextPluginMounthActual],
    });
  }
  ngAfterViewInit(): void {

  }
}
