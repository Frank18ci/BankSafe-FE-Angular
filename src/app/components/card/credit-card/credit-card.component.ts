import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Chart, registerables} from 'chart.js/auto';
Chart.register(...registerables)
@Component({
  selector: 'app-credit-card',
  imports: [],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.scss'
})
export class CreditCardComponent implements AfterViewInit {
  @ViewChild('myChart', { static: false }) myChart!: ElementRef;
  @ViewChild('myChart2', { static: false }) myChart2!: ElementRef;

  ngAfterViewInit(): void {
    

    const ctx = this.myChart.nativeElement.getContext('2d');

    const centerTextPlugin = {
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
        ctx.fillText('May', centerX, centerY - 10);

        ctx.font = '14px sans-serif';
        ctx.fillText('25% de Total', centerX, centerY + 12);

        ctx.restore();
      }
    }

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [75, 25],
          backgroundColor: ['#2669D2', '#2669D222'],
          rotation: 140,
          weight: 0.6
        }]
      },
      options: {
        responsive: true,
        cutout: '70%', // hace el centro más grande
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
          }
        },
        plugins: [centerTextPlugin]
      });
    const ctx2 = this.myChart2.nativeElement.getContext('2d');
    new Chart(ctx2, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [57, 43],
          backgroundColor: ['#2669D2', '#2669D222'],
          rotation: 140,
          weight: 0.6
        }]
      },
      options: {
        responsive: true,
        cutout: '70%',
        plugins: {
         legend: {display: false},
         tooltip: {enabled: false} 
        }
      },
      plugins: [centerTextPlugin]
    });
  }

}
