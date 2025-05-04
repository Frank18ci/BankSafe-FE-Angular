import Tarjeta from "../Tarjeta";
import User from "../User";
import { TipoPlazo } from "./tipo-plazo";

export interface Prestamo {
    id? : number;
    monto? : number;
	montoPrestamo? : number;
    montoPagado? : number;
	montoPorPlazo? : number;
	interesAnual? : number;
    plazos? : number;
    
    fechaInicio?: string;
    fechaFin?: string;
	FechaRegistro?: string;
	FechaFinalizado?: string;
	
	estadoPrestamo?: EstadoPrestamo;
	user: User;
	tipoPlazo?: TipoPlazo;
	tarjetaRecepcion: Tarjeta;
}
export interface EstadoPrestamo{
	id?: number,
	estadoPrestamo?: string
}
