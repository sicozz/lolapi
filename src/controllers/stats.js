const StatsDAO = require('../models/stats');
const { extractChampStats } = require('../helpers/extractBody');

exports.getStats = async (req, res, next) => {
    const champId = req.params.id;

    try {
        const champStats = await StatsDAO.findOne({ where: { id: champId } });

        if (!champStats) {
            return res.status(404).json(
                `Could not find stats of champion with id: ${champId}`
              );
        }
        return res.status(200).json(champStats);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};

exports.updateStats = async (req, res, next) => {
    const champId = req.body.id;
    const newStats = extractChampStats(req);

    try {
        const currStats = await StatsDAO.findOne({ where: { id: champId } });
        if (!currStats) {
            return res.status(404).json(
                `Could not find stats of champion with id: ${champId}`
            )
        }
        await currStats.update(newStats, { where: { id: champId } });
        return res.status(201).json(`${champId} stats were updated`);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};