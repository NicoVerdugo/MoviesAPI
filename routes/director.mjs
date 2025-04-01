import express from 'express';
import Director from '../models/Director.mjs';
import Movie from '../models/Movie.mjs'; // Importar el modelo Movie
import { authenticateToken } from '../middleware/auth.mjs';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Directors
 *   description: Endpoints para gestionar directores
 */

/**
 * @swagger
 * /directors:
 *   post:
 *     summary: Crear un nuevo director
 *     tags: [Directors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *               movies:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Director creado exitosamente
 *       500:
 *         description: Error al crear el director
 */

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { id, name, country, movies } = req.body;

        // Buscar los ObjectId de las películas por sus títulos
        const movieIds = await Movie.find({ title: { $in: movies } }).select('_id');
        if (movieIds.length !== movies.length) {
            return res.status(400).json({ message: 'Algunas películas no fueron encontradas' });
        }

        const newDirector = new Director({ id, name, country, movies: movieIds.map(movie => movie._id) });
        await newDirector.save();
        res.status(201).json(newDirector);
    } catch (error) {
        console.error('Error creating director:', error);
        res.status(500).json({ message: 'Error creating director', error });
    }
});

// Obtener todos los directores
router.get('/', authenticateToken, async (req, res) => {
    try {
        const directors = await Director.find();
        res.json(directors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un director por ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const director = await Director.findOne({ id: req.params.id });
        if (!director) {
            return res.status(404).json({ error: "Director no encontrado" });
        }
        res.json(director);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un director por ID
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { name, country, movies } = req.body;
        const director = await Director.findOneAndUpdate(
            { id: req.params.id },
            { name, country, movies },
            { new: true }
        );
        if (!director) {
            return res.status(404).json({ error: "Director no encontrado" });
        }
        res.json(director);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un director por ID
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const director = await Director.findOneAndDelete({ id: req.params.id });
        if (!director) {
            return res.status(404).json({ error: "Director no encontrado" });
        }
        res.json({ message: "Director eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
