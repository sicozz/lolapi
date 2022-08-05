const axios = require('axios');

const ChampionDAO = require('../models/champion');
const StatDAO = require('../models/stat');
const {
  extractChampInfo,
  extractChampStats,
  extractRemoteChamp
} = require('../helpers/extractBody');

// RIOT DEVELOPER PORTAL API
const riotChampReq = (championName, version) =>
  `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${championName}.json`;
const riotVersions = "https://ddragon.leagueoflegends.com/api/versions.json";

// Retrieve every champion from  db
exports.getAllChamps = async (req, res, next) => {
  try {
    const allChamps = await ChampionDAO.findAll({
      include: { model: StatDAO, required: true }
    });
    return res.status(200).json(allChamps);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

// Query a champion with an specific id
exports.getChamp = async (req, res, next) => {
  const championName = req.params.name;

  try {
    const champion = await ChampionDAO.findOne({
      where: { name: championName },
      include: { model: StatDAO, required: true }
    });
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
exports.addChamp = async (req, res, next) => {
  const newChampInfo = extractChampInfo(req.body);
  const newChampStats = extractChampStats(req.body);

  try {
    const champion = await ChampionDAO.findOne({
      where: { name: newChampInfo.name },
      include: { model: StatDAO, required: true }
    });
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
exports.updateChamp = async (req, res, next) => {
  const championName = req.body.name;
  const newChampInfo = extractChampInfo(req.body);
  const newChampStats = extractChampStats(req.body);

  try {
    const currInfo = await ChampionDAO.findOne({
      where: { name: championName }
    });
    const currStats = await StatDAO.findOne({
      where: { name: championName }
    });
    if (!currInfo || !currStats) {
      return res.status(404).json(
        `Could not find champion with name: ${championName}`
      );
    }
    await currInfo.update(newChampInfo, { where: { name: championName } });
    await currStats.update(newChampStats, { where: { name: championName } });
    return res.status(201).json(`${championName} was updated`);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

// Delete champion
exports.deleteChamp = async (req, res, next) => {
  const championName = req.params.name;

  try {
    const champion = await ChampionDAO.findOne({
      where: { name: championName }
    });
    if (!champion) {
      return res.status(404).json(
        `Could not find champion with name: ${championName}`
      );
    }
    // Soft delete (cascade)
    await champion.destroy();
    return res.status(201).json(`${championName} was deleted`);
  } catch (err) {
    console.error(err);
    return res.status(500).json(error);
  }
};

// Refresh champion and retrieve the info
exports.refreshChamp = async (req, res, next) => {
  const riotResp = await axios.get(riotVersions);
  const latestVersion = riotResp.data[0];
  const championName = req.params.name;

  try {
    const champion = await ChampionDAO.findOne({
      where: { name: championName }
    });

    const remoteChampion = await axios.get(
      riotChampReq(championName, latestVersion)
    );

    if (!champion || champion.version != latestVersion) {
      const newChamp = extractRemoteChamp(remoteChampion.data, championName);
      const newChampInfo = extractChampInfo(newChamp);
      const newChampStats = extractChampStats(newChamp);

      try {
        const currInfo = await ChampionDAO.findOne({
          where: { name: championName }
        });
        const currStats = await StatDAO.findOne({
          where: { name: championName }
        });

        if (!currInfo || !currStats) {
          const championInfo = await ChampionDAO.create(newChampInfo);

          newChampStats.championId = championInfo.id;
          await StatDAO.create(newChampStats);
        } else {
          await currInfo.update(newChampInfo, { where: { name: championName } });
          await currStats.update(newChampStats, { where: { name: championName } });
        }
        console.log(`${championName} was refreshed`);
        return res.status(201).json(newChamp);
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
}
