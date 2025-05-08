import { EstadoPagoServicio } from "./EstadoPagoServicio";
import { Servicio } from "./Servicio";

export interface PagoServicio {
    id ?: number;
    montoPago ?: number;
    fechaPago ?: string;
    servicio ?: Servicio;
    estadoPagoServicio ?: EstadoPagoServicio;
}