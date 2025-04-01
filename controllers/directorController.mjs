import Director from '../models/Director.mjs';

export const getDirectors = async (req, res) => {
    const directors = await Director.find().populate('movies');
    res.json(directors);
};
