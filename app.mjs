import dotenv from 'dotenv';
dotenv.config(); // Asegúrate de que esto esté antes de usar process.env

import express from 'express';
import movieRoutes from './routes/movie.mjs';
import mongoose from 'mongoose';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();

// Conectar a la base de datos
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

// Middleware para parsear JSON
app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Movies API',
            version: '1.0.0',
            description: 'API para gestionar películas y directores',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
            },
        ],
    },
    apis: ['./routes/*.mjs'], // Ruta a los archivos con anotaciones Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Registrar rutas
app.use('/movies', movieRoutes);

const PORT = process.env.PORT || 3000; // Usar el puerto de .env o 3000 por defecto
console.log(`Using port: ${PORT}`); // Log para verificar el puerto

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});