import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  hp: {
    type: Number
  },

  hpperlevel: {
    type: Number
  },

  mp: {
    type: Number
  },

  mpperlevel: {
    type: Number
  },

  movespeed: {
    type: Number
  },

  armor: {
    type: Number
  },

  armorperlevel: {
    type: Number
  },

  spellblock: {
    type: Number
  },

  spellblockperlevel: {
    type: Number
  },

  attackrange: {
    type: Number
  },

  hpregen: {
    type: Number
  },

  hpregenperlevel: {
    type: Number
  },

  mpregen: {
    type: Number
  },

  mpregenperlevel: {
    type: Number
  },

  crit: {
    type: Number
  },

  critperlevel: {
    type: Number
  },

  attackdamage: {
    type: Number
  },

  attackdamageperlevel: {
    type: Number
  },

  attackspeedperlevel: {
    type: Number
  }
});

export default mongoose.model('Stat', statSchema);
