import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    director: { type: String, required: true }
});

export default mongoose.model('Movie', MovieSchema);
