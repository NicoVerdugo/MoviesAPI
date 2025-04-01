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

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Obtener todas las películas
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Lista de películas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Error al obtener las películas
 */
// Obtener todas las películas
router.get('/', authenticateToken, async (req, res) => {
    try {
        const movies = await Movie.find(); // Buscar todas las películas en la BD
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Eliminar una película por ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la película a eliminar
 *     responses:
 *       200:
 *         description: Película eliminada correctamente
 *       404:
 *         description: Película no encontrada
 *       500:
 *         description: Error al eliminar la película
 */
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

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Actualizar una película por ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la película a actualizar
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
 *       200:
 *         description: Película actualizada correctamente
 *       404:
 *         description: Película no encontrada
 *       500:
 *         description: Error al actualizar la película
 */
// Actualizar película por ID
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
