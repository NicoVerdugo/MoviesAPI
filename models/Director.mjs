import mongoose from 'mongoose';

const DirectorSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] 
});

export default mongoose.model('Director', DirectorSchema);
