const ChampsDAO = require('../models/champs');

// Retrieve every champ from  db
exports.getAllChamps = async (req, res, next) => {
  try {
    const allChamps = await ChampsDAO.findAll();
    return res.status(200).json(allChamps);
  } catch (err) {
    console.error(err);
    return res.status(500).json(error);
  }
};

// Query a champion with an specific id
exports.getChamp = async (req, res, next) => {
  const champId = req.params.id;

  try {
    const champ = await ChampsDAO.findOne({ where: { id: champId } });
    if (!champ) {
      return res.status(404).json(
        `Could not find champion with id: ${champId}`
      );
    }
    return res.status(200).json(champ);
  } catch (err) {
    console.error(err);
    return res.status(500).json(error);
  }
};

// Create a new champion
exports.addChamp = async (req, res, next) => {
  const newChamp = {
    id: req.body.id,
    attack: Number(req.body.attack),
    defense: Number(req.body.defense),
    magic: Number(req.body.magic),
    difficulty: Number(req.body.difficulty)
  };

  try {
    const champ = await ChampsDAO.create(newChamp);
    return res.status(201).json(champ);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

// Update champion
exports.updateChamp = async (req, res, next) => {
  const champId = req.body.id;
  const newValues = {
    attack: req.body.attack,
    defense: req.body.defense,
    magic: req.body.magic,
    difficulty: req.body.difficulty
  };

  try {
    // Check if the champ does exist
    const champ = await ChampsDAO.findOne({ where: { id: champId } });
    if (!champ) {
      return res.status(404).json(
        `Could not find champion with id: ${champId}`
      );
    }
    await champ.update(newValues, { where: { id: champId } });
    return res.status(201).json(`${champId} was updated`);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}

// Delete champion
exports.deleteChamp = async (req, res, next) => {
  const champId = req.params.id;

  try {
    // Check if the champ does exist
    const champ = await ChampsDAO.findOne({ where: { id: champId } });
    if (!champ) {
      return res.status(404).json(
        `Could not find champion with id: ${champId}`
      );
    }
    await champ.destroy();
    return res.status(201).json(`${champId} was deleted`);
  } catch (err) {
    console.error(err);
    return res.status(500).json(error);
  }
}