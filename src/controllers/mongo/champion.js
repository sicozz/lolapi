import ChampionDAO from '../../services/mongo/champion.js';
import StatDAO from '../../services/mongo/stat.js';
import {
  extractChampInfo,
  extractChampStats,
  extractRemoteChamp,
} from '../../helpers/extractBody.js';
import riotAPI from '../../helpers/riotAPI.js';

// Retrieve every champion from  db
const getAllChamps = async (_req, res, next) => {
  try {
    const allChamps = await ChampionDAO.findAll();
    return res.status(200).json(allChamps);
  } catch (err) {
    return next(err);
  }
};

// Query a champion with an specific name
const getChamp = async (req, res, next) => {
  const championName = req.params.name;
  try {
    const champion = await ChampionDAO.findByName(championName);
    if (!champion) {
      return res.status(404).json(
        `Could not find champion with name: ${championName}`,
      );
    }
    return res.status(200).json(champion);
  } catch (err) {
    return next(err);
  }
};

// Create a new champion
const addChamp = async (req, res, next) => {
  const newChampInfo = extractChampInfo(req.body);
  const newChampStats = extractChampStats(req.body);
  const championName = newChampInfo.name;

  try {
    if (!championName) {
      throw new Error('A name is required to create a new champion');
    }

    const champion = await ChampionDAO.findByName(championName);
    if (champion) {
      return res.status(409).json(
        `Champion with name: ${newChampInfo.name} already exists`,
      );
    }

    const championStats = await StatDAO.create(newChampStats);
    newChampInfo.stats = championStats._id;
    const championInfo = await ChampionDAO.create(newChampInfo);

    const values = {
      ...championInfo._doc,
      ...championStats._doc,
    };
    return res.status(201).json(values);
  } catch (err) {
    return next(err);
  }
};

// Update champion
const updateChamp = async (req, res, next) => {
  const championName = req.body.name;
  const newChampInfo = extractChampInfo(req.body);
  const newChampStats = extractChampStats(req.body);

  try {
    if (!championName) {
      throw new Error('Champion name is required to update the champion');
    }

    const champion = await ChampionDAO.findByName(championName);
    if (!champion) {
      return res.status(404).json(
        `Could not find champion with name: ${championName}`,
      );
    }

    await ChampionDAO.update(championName, newChampInfo);
    await StatDAO.update(championName, newChampStats);
    const updatedChampion = await ChampionDAO.findByName(championName);

    return res.status(201).json(updatedChampion);
  } catch (err) {
    return next(err);
  }
};

// Delete champion
const deleteChamp = async (req, res, next) => {
  const championName = req.params.name;

  try {
    await ChampionDAO.destroy(championName);
    return res.status(201).json(`${championName} was deleted`);
  } catch (err) {
    return next(err);
  }
};

// Refresh champion and retrieve the info
const refreshChamp = async (req, res, next) => {
  try {
    const championName = req.params.name;
    const champion = await ChampionDAO.findByName(championName);
    const remoteChampion = await riotAPI.getChampionLstVersion(championName);

    const newChampData = extractRemoteChamp(remoteChampion.data, championName);
    req.body = newChampData;

    if (!champion) {
      return addChamp(req, res, next);
    } if (champion.version !== remoteChampion.version) {
      return updateChamp(req, res, next);
    }
    return res.status(302).json(champion);
  } catch (err) {
    return next(err);
  }
};

export default {
  getAllChamps,
  getChamp,
  addChamp,
  updateChamp,
  deleteChamp,
  refreshChamp,
};
