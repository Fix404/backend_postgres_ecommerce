enum TipoProducto {
  ROPA = "ROPA",
  CALZADO = "CALZADO",
  ACCESORIO = "ACCESORIO",
  OTRO = "OTRO",
}

enum SexoProducto {
  MASCULINO = "MASCULINO",
  FEMENINO = "FEMENINO",
  UNISEX = "UNISEX",
}

interface Producto {
  id: number;
  nombre: string;
  tipo: TipoProducto;
  sexo: SexoProducto;
  descripcion: string;
  idCategoria: number;
  idImagen: number;
  idDescuento?: number;
}

