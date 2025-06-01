import { Localidad } from "./localidadInterface";

export interface Direccion {
  id:number
  calle:string,
  altura:number,
  idLocalidad: number;
  localidad?: Localidad;
}