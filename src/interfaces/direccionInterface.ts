interface Direccion {
  id:number
  calle:string,
  altura:number,
  idLocalidad: number;
  localidad?: Localidad;
}