import RoleUser from "./RoleUser";
import tipoDocumentoUser from "./TipoDocumentoUser";

export default interface User{
    id: number,
    numeroDocumento: string,
    nombres: string,
    apellidos: string,
    fechaNacimiento: string,
    imagePath: string,
    roleUser: RoleUser,
    tipoDocumentoUser: tipoDocumentoUser,
}