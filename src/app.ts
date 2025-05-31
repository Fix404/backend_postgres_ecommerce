import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import categoriaRoutes from './routes/categoriaRoutes'
import colorRoutes from './routes/colorRoutes'
import descuentoRoutes from './routes/descuentoRoutes'
import imagenRoutes from './routes/imagenRoutes'
import localidadRoutes from './routes/localidadRoutes'
import direccionRoutes from './routes/direccionRoutes'
import ordenCompraRoutes from './routes/ordenCompraRoutes'
import precioRoutes from './routes/precioRoutes'
import cantidadProductoRoutes from './routes/productoCantidadRoutes'
import productoRoutes from './routes/productoRoutes'
import talleRoutes from './routes/talleRoutes'
import usuarioRoutes from './routes/usuarioRoutes'
import authRoutes from './routes/authRoutes'

const app = express();

app.use(express.json())

// ---------------------------------- Rutas ------------------------------------------- //

app.use('/categorias', categoriaRoutes)
app.use('/color', colorRoutes)
app.use('/descuentos',descuentoRoutes)
app.use('/imagenes',imagenRoutes)
app.use('/localidad',localidadRoutes)
app.use('/direcciones',direccionRoutes)
app.use('/ordenesCompra', ordenCompraRoutes)
app.use('/precios', precioRoutes)
app.use('/cantidadesProducto', cantidadProductoRoutes)
app.use('/productos', productoRoutes)
app.use('/talles', talleRoutes)
app.use('/usuarios', usuarioRoutes)

app.use("/verify", authRoutes)

export default app;