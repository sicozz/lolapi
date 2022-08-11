import axios from 'axios';

// import ChampionDAO from '../services/mongo/champion.js';
// import StatDAO from '../services/mongo/stat.js';
import {
  extractChampInfo,
  extractChampStats,
  extractRemoteChamp
} from '../helpers/extractBody.js';
import riotAPI from '../helpers/riotAPI.js';

// Retrieve every champion from  db
const getAllChamps = async (_req, res, next) => {
  res.json("Mongo getAllChamps");
};

// Query a champion with an specific name
const getChamp = async (req, res, next) => {
  res.json("Mongo getChamp");
};

// Create a new champion
const addChamp = async (req, res, next) => {
  res.json("Mongo addChamp");
};

// Update champion
const updateChamp = async (req, res, next) => {
  res.json("Mongo updateChamp");
};

// Delete champion
const deleteChamp = async (req, res, next) => {
  res.json("Mongo deleteChamp");
};

// Refresh champion and retrieve the info
const refreshChamp = async (req, res, next) => {
  res.json("Mongo refreshChamp");
};

export default {
  getAllChamps,
  getChamp,
  addChamp,
  updateChamp,
  deleteChamp,
  refreshChamp
}
