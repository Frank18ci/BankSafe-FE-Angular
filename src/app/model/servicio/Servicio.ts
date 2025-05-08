import { Empresa } from "./Empresa";

export interface Servicio {
    id ?: number;
    codigo ?: string;
    empresa ?: Empresa;
}