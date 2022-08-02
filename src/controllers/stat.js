const StatDAO = require('../models/stat');
const { extractChampStats } = require('../helpers/extractBody');

exports.getStats = async (req, res, next) => {
  const championName = req.params.name;

  try {
    const championStats = await StatDAO.findOne({ where: { name: championName } });

    if (!championStats) {
      return res.status(404).json(
        `Could not find stats of champion with name: ${championName}`
      );
    }
    return res.status(200).json(championStats);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
