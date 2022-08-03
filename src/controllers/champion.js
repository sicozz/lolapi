const ChampionDAO = require('../models/champion');
const StatDAO = require('../models/stat');
const { extractChampInfo, extractChampStats } = require('../helpers/extractBody');

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
  const newChampInfo = extractChampInfo(req);
  const newChampStats = extractChampStats(req);

  try {
    const championInfo = await ChampionDAO.create(newChampInfo);
    console.log(`=== CHAMPIONID: ${championInfo.id}`);
    newChampStats.championId = championInfo.id;
    const championStats = await StatDAO.create(newChampStats);
    const champion = Object.assign({}, championInfo, championStats);
    const values = champion.dataValues;
    return res.status(201).json(values);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

// Update champion
exports.updateChamp = async (req, res, next) => {
  const championName = req.body.name;
  const newInfo = extractChampInfo(req);
  const newStats = extractChampStats(req);

  try {
    // Check if the champion does exist
    const currInfo = await ChampionDAO.findOne({ where: { name: championName } });
    const currStats = await StatDAO.findOne({ where: { name: championName } });
    if (!currInfo || !currStats) {
      return res.status(404).json(
        `Could not find champion with name: ${championName}`
      );
    }
    await currInfo.update(newInfo, { where: { name: championName } });
    await currStats.update(newStats, { where: { name: championName } });
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
    // Check if the champion does exist
    const champion = await ChampionDAO.findOne({ where: { name: championName } });
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
