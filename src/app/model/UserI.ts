import RoleUser from "./RoleUser";
import Tarjeta from "./Tarjeta";
import tipoDocumentoUser from "./TipoDocumentoUser";

export default interface UserI{
    id?: number,
    numeroDocumento?: string,
    nombres?: string,
    apellidos?: string,
    fechaNacimiento?: string,
    imagePath?: string,
    roleUser?: RoleUser,
    tipoDocumentoUser?: tipoDocumentoUser,
    tarjetas?: Tarjeta[]
}