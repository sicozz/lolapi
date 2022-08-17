import mongoose from 'mongoose';

const championSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  version: {
    type: String,
    required: true,
  },

  title: {
    type: String,
  },

  attack: {
    type: Number,
  },

  defense: {
    type: Number,
  },

  magic: {
    type: Number,
  },

  difficulty: {
    type: Number,
  },

  stats: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stat',
  },
});

export default mongoose.model('Champion', championSchema);
