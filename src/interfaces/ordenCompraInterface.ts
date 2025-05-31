type MovimientoOrden = 'COMPRA' | 'VENTA' | 'DEVOLUCION' | 'AJUSTE';

interface OrdenCompra {
  id: number;
  fecha: Date;
  precioTotal: number;
  movimiento: MovimientoOrden;
  idUsuario: number;
  idProductoCantidad: number;
}
