import Movie from '../models/Movie.mjs';

export const getMovies = async (req, res) => {
    const movies = await Movie.find().populate('director');
    res.json(movies);
};
