import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-credit-card',
  imports: [],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.scss'
})
export class CreditCardComponent implements AfterViewInit {
  @ViewChild('myChart', { static: false }) myChart!: ElementRef;

  constructor(private cdr:ChangeDetectorRef) {
    
  }
  ngAfterViewInit(): void {
    

    const ctx = this.myChart.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo'],
        datasets: [{
          label: 'Ventas',
          data: [12, 19, 3],
          backgroundColor: '#2669D2'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        }
      }
    });
    this.cdr.detectChanges();
  }

}
