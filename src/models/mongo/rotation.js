import mongoose from 'mongoose';

const rotationSchema = new mongoose.Schema({
  freeChampions: {
    type: [String],
    required: true,
  },
  freeChampionsForNewPlayers: {
    type: [String],
    required: true,
  },
  maxNewPlayerLevel: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Rotation', rotationSchema);
