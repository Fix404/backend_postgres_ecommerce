import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const app = express();

app.use(express.json())

// ---------------------------------- Rutas ------------------------------------------- //

// --- Autenticación de Usuario --- //
// Gestión de usuarios
app.use('/usuarios')

// --- Productos --- //
// appEcommerce.use('productos')

export default app;