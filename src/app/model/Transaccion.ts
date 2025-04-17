import Tarjeta from "./Tarjeta";
import TipoTransacion from "./TipoTransacion";

export default interface Transaccion{
    id: number,
    monto: number,
    tipoTransacion : TipoTransacion,
    tarjetaOrigen: Tarjeta,
    tarjetaDestino: Tarjeta
}