import axios from 'axios';

import ChampionDAO from '../services/sql/champion.js';
import StatDAO from '../services/sql/stat.js';
import {
  extractChampInfo,
  extractChampStats,
  extractRemoteChamp
} from '../helpers/extractBody.js';
import riotAPI from '../helpers/riotAPI.js';

// Retrieve every champion from  db
const getAllChamps = async (_req, res) => {
  try {
    const allChamps = await ChampionDAO.findAll();
    return res.status(200).json(allChamps);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

// Query a champion with an specific name
const getChamp = async (req, res) => {
  const championName = req.params.name;
  try {
    const champion = await ChampionDAO.findByName(championName);
    if (!champion) {
      return res.status(404).json(
        `Could not find champion with name: ${championName}`
      );
    }
    return res.status(200).json(champion);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

// Create a new champion
const addChamp = async (req, res) => {
  const newChampInfo = extractChampInfo(req.body);
  const newChampStats = extractChampStats(req.body);

  try {
    const champion = await ChampionDAO.findByName(newChampInfo.name);
    if (champion) {
      return res.status(409).json(
        `Champion with name: ${newChampInfo.name} already exists`
      );
    }

    const championInfo = await ChampionDAO.create(newChampInfo);
    newChampStats.championId = championInfo.id;
    const championStats = await StatDAO.create(newChampStats);

    const values = Object.assign(
      {},
      championInfo.dataValues,
      championStats.dataValues
    );
    return res.status(201).json(values);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

// Update champion
const updateChamp = async (req, res) => {
  const championName = req.body.name;
  const newChampInfo = extractChampInfo(req.body);
  const newChampStats = extractChampStats(req.body);

  try {
    const champion = await ChampionDAO.findByName(championName);
    if (!champion) {
      return res.status(404).json(
        `Could not find champion with name: ${championName}`
      );
    }

    await ChampionDAO.update(championName, newChampInfo);
    await StatDAO.update(championName, newChampStats);

    return res.status(201).json(`${championName} was updated`);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

// Delete champion
const deleteChamp = async (req, res) => {
  const championName = req.params.name;

  try {
    await ChampionDAO.destroy(championName);
    return res.status(201).json(`${championName} was deleted`);
  } catch (err) {
    console.error(err);
    return res.status(500).json(error);
  }
};

// Refresh champion and retrieve the info
const refreshChamp = async (req, res) => {
  const riotResp = await axios.get(riotAPI.versionsUrl);
  const latestVersion = riotResp.data[0];
  const championName = req.params.name;

  try {
    const champion = await ChampionDAO.findByName(championName);
    const remoteChampion = await axios.get(
      riotAPI.champUrl(championName, latestVersion)
    );

    if (!champion || champion.version != latestVersion) {
      const newChampData = extractRemoteChamp(remoteChampion.data, championName);
      const newChampInfo = extractChampInfo(newChampData);
      const newChampStats = extractChampStats(newChampData);

      try {
        if (!champion) {
          const newChamp = await ChampionDAO.create(newChampInfo);
          newChampStats.championId = newChamp.id;
          await StatDAO.create(newChampStats);
        } else {
          await ChampionDAO.update(championName, newChampInfo);
          await StatDAO.update(championName, newChampStats);
        }

        const refreshedChamp = await ChampionDAO.findByName(championName);
        console.log(`${championName} was refreshed`);
        return res.status(201).json(refreshedChamp);
      } catch (err) {
        console.error(err);
        return res.status(500).json(err);
      }
    }
    return res.status(302).json(champion);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

export default {
  getAllChamps,
  getChamp,
  addChamp,
  updateChamp,
  deleteChamp,
  refreshChamp
}
