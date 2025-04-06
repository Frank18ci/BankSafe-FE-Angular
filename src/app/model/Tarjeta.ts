import TipoMonedaTarjeta from "./TipoMonedaTarjeta"
import TipoTarjeta from "./TipoTarjeta"
import User from "./User"

export default interface Tarjeta{
    id: number,
    cvv: string,
    fechaVencimiento: Date
    numeroTarjeta: string,
    claveInternet: string,
    monto: number,
    user: User,
    tipoTarjeta: TipoTarjeta,
    tipoMonedaTarjeta: TipoMonedaTarjeta
}