import express from 'express';
import Movie from '../models/Movie.mjs';
import { authenticateToken } from '../middleware/auth.mjs';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Endpoints para gestionar películas
 */

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Crear una nueva película
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               year:
 *                 type: number
 *               director:
 *                 type: string
 *     responses:
 *       201:
 *         description: Película creada exitosamente
 *       500:
 *         description: Error al crear la película
 */

// Crear una nueva película
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { title, year, director } = req.body;
        const newMovie = new Movie({ title, year, director });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        console.error('Error creating movie:', error); // Log para depuración
        res.status(500).json({ message: 'Error creating movie', error });
    }
});

// Obtener todas las películas
router.get('/', authenticateToken, async (req, res) => {
    try {
        const movies = await Movie.find(); // Buscar todas las películas en la BD
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una película por ID
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: "Película no encontrada" });
        }
        res.json({ message: "Película eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Actualizar perlicula por ID
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { title, year, director } = req.body;
        const movie = await Movie.findByIdAndUpdate(req.params.id, { title, year, director }, { new: true });
        if (!movie) {
            return res.status(404).json({ error: "Película no encontrada" });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



export default router;
