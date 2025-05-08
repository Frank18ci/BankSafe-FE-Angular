import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../../../services/Prestamo/prestamo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Empresa } from '../../../model/servicio/Empresa';
import { EmpresaService } from '../../../services/empresa/empresa.service';

@Component({
  selector: 'app-pago-de-servicios',
  imports: [CommonModule, FormsModule],
  templateUrl: './pago-de-servicios.component.html',
  styleUrl: './pago-de-servicios.component.scss'
})
export class PagoDeServiciosComponent implements OnInit {
  constructor(
    private empresaService : EmpresaService,
  ) { }
  ngOnInit(): void {
    
  }
  valorBusqueda = ""
  empresas: Empresa[] = []
  realizarBusquedaEmpresa(){
    this.buscarEmpresa(this.valorBusqueda, this.valorBusqueda)  
  }
  buscarEmpresa(nombre: string, tipoEmpresaDescripcion: string){
    this.empresaService.getEmpresaByNombreAndTipoEmpresaDescripcion(nombre, tipoEmpresaDescripcion).subscribe({
      next: data => {
        this.empresas = data
      }
    })
  }
}
