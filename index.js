// Importaciones
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.mjs';
import directorRoutes from './routes/director.mjs';
import movieRoutes from './routes/movie.mjs';
import authRoutes from './routes/auth.mjs';
import { authenticateToken } from './middleware/auth.mjs';

// Configuración
dotenv.config();
const app = express();
app.set('PORT', process.env.PORT || 4500);
app.use(express.json());

// Conectar a la base de datos
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch(err => console.error('❌ Error de conexión a MongoDB Atlas:', err));

// Modelos
import Director from './models/Director.mjs';
import Movie from './models/Movie.mjs';

// Rutas
app.use('/directors', authenticateToken, directorRoutes);
app.use('/movies', authenticateToken, movieRoutes);
app.use('/auth', authRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Iniciar servidor
app.listen(app.get('PORT'), () => {
    console.log(`Server running at http://127.0.0.1:${app.get('PORT')}/`);
});
