import Tarjeta from "./Tarjeta";
import TipoTransacion from "./TipoTransacion";

export default interface TransaccionConversionMoneda{
    id: number,
    montoTarjetaOrigen: number,
    montoTarjetaDestino: number,
    tipoTransacion : TipoTransacion,
    tarjetaOrigen: Tarjeta,
    tarjetaDestino: Tarjeta,
}