import { Component, OnInit } from '@angular/core';
import { NavBarPrestamoComponent } from "../nav-bar-prestamo/nav-bar-prestamo.component";
import { CommonModule } from '@angular/common';
import { Prestamo } from '../../../../model/prestamo/prestamo';
import { PrestamoService } from '../../../../services/Prestamo/prestamo.service';
import { ActivatedRoute } from '@angular/router';
import { DetallePrestamo } from '../../../../model/prestamo/detalle-prestamo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prestamo-detalle',
  imports: [NavBarPrestamoComponent, CommonModule],
  templateUrl: './prestamo-detalle.component.html',
  styleUrl: './prestamo-detalle.component.scss'
})
export class PrestamoDetalleComponent implements OnInit{
  constructor(
    private prestamoService : PrestamoService,
    private readonly route: ActivatedRoute,
    private readonly toastrService: ToastrService
  ){

  }
  numeroPrestamo = 0
  ngOnInit(): void {
    this.route.params.subscribe(p =>{
      this.numeroPrestamo = p['id']
      this.cargarPrestamo()
    } 
    )
    
  }
  cargarPrestamo(){
    this.prestamoService.getPrestamosById(this.numeroPrestamo).subscribe({
      next: data => {
        this.prestamo = data
        this.calcularPagos()
      }
    })
  }
  prestamo : Prestamo = {
    user: {},
    tarjetaRecepcion: {}
  };
  calcularPagos() {
    this.prestamos = [];
    const fechaInicio = new Date(this.prestamo.fechaInicio || "");
  
    const mesesPorPlazo = 12 / (this.prestamo.tipoPlazo?.valorAnual || 1);
  
    for (let i = 1; i <= (this.prestamo.plazos || 0); i++) {
      const fechaPago = new Date(fechaInicio);
      fechaPago.setMonth(fechaPago.getMonth() + (i * mesesPorPlazo));
      
      if(this.prestamo.montoPagado === this.prestamo.montoPrestamo){
        this.prestamos.push({
          monto: this.prestamo.montoPorPlazo,
          fecha: this.formatearFecha(fechaPago),
          estado: 'Pagado'
        });

      }
      else if(i <= (this.prestamo.montoPagado! / this.prestamo.montoPorPlazo!)){
        this.prestamos.push({
          monto: this.prestamo.montoPorPlazo,
          fecha: this.formatearFecha(fechaPago),
          estado: 'Pagado'
        });
      } else {
        this.prestamos.push({
          monto: this.prestamo.montoPorPlazo,
          fecha: this.formatearFecha(fechaPago),
          estado: 'Pendiente'
        });
      }
      
    }
  } 
   formatearFecha(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }
  prestamos : DetallePrestamo[] = [
    
  ];
  realizarPago(){
    if(this.prestamo.montoPagado === this.prestamo.montoPrestamo){
      this.toastrService.info("Ya realizaste todos los pagos", "Informacion")
      return
    } else{
      this.prestamoService.realizarPago(this.prestamo.id || 0).subscribe({
        next: data =>{
          this.toastrService.success("Pago realizado con exito", "Exito")
          this.cargarPrestamo()
        },
        error: error =>{
          this.toastrService.error(error.error.mensaje, "Error")
        }
      })
    }
    
  }
  
}
