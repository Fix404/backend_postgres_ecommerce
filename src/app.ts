import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import categoriaRoutes from './routes/categoriaRoutes'
import colorRoutes from './routes/colorRoutes'
import descuentoRoutes from './routes/descuentoRoutes'
import imagenRoutes from './routes/imagenRoutes'

const app = express();

app.use(express.json())

// ---------------------------------- Rutas ------------------------------------------- //

// --- Autenticación de Usuario --- //
// Gestión de usuarios

app.use('/categorias', categoriaRoutes)
app.use('/color', colorRoutes)
app.use('/descuentos',descuentoRoutes)
app.use('/imagenes',imagenRoutes)





//app.use('/usuarios')

// --- Productos --- //
// app.use('productos')



export default app;