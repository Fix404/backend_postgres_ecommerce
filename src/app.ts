import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const appEcommerce = express();

appEcommerce.use(express.json())

// ---------------------------------- Rutas ------------------------------------------- //

// --- Autenticación de Usuario --- //
// Gestión de usuarios
appEcommerce.use('/usuarios')

// --- Productos --- //
// appEcommerce.use('productos')

export default appEcommerce;