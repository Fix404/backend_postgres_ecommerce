import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { authenticateToken } from './middlewares/authenticateToken'
import categoriaRoutes from './routes/categoriaRoutes'
import colorRoutes from './routes/colorRoutes'
import descuentoRoutes from './routes/descuentoRoutes'
import detalleRoutes from './routes/detalleRoutes'
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

// Rutas publicas
app.use("/verify", authRoutes)

// Rutas protegidas
app.use('/categorias', authenticateToken, categoriaRoutes)
app.use('/color', authenticateToken, colorRoutes)
app.use('/descuentos', authenticateToken, descuentoRoutes)
app.use('/detalle', authenticateToken, detalleRoutes)
app.use('/imagenes', authenticateToken, imagenRoutes)
app.use('/localidad', authenticateToken, localidadRoutes)
app.use('/direcciones', authenticateToken, direccionRoutes)
app.use('/ordenesCompra', authenticateToken, ordenCompraRoutes)
app.use('/precios', authenticateToken, precioRoutes)
app.use('/cantidadesProducto', authenticateToken, cantidadProductoRoutes)
app.use('/productos', authenticateToken, productoRoutes)
app.use('/talles', authenticateToken, talleRoutes)
app.use('/usuarios', authenticateToken, usuarioRoutes)



export default app;