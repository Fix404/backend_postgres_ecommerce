type MovimientoOrden = 'COMPRA' | 'VENTA' | 'DEVOLUCION' | 'AJUSTE';

export interface OrdenCompra {
  id: number;
  fecha: Date;
  precioTotal: number;
  movimiento: MovimientoOrden;
  idUsuario: number;
  idProductoCantidad: number;
}
