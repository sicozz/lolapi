import StatDAO from '../../services/mongo/stat.js';

const getStats = async (req, res, next) => {
  const championName = req.params.name;

  try {
    const championStats = await StatDAO.findByName(championName);
    if (!championStats) {
      return res.status(404).json(
        `Could not find stats of champion with name: ${championName}`
      );
    }
    return res.status(200).json(championStats);
  } catch (err) {
    next(err);
  }
};

export default {
  getStats
}
