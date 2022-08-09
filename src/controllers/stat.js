import StatDAO from '../services/sql/stat.js';

const getStats = async (req, res) => {
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
    console.error(err);
    return res.status(500).json(err);
  }
};

export default {
  getStats
}
