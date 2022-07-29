const ChampsDAO = require('../models/champs');
const StatsDAO = require('../models/stats');
const { extractChampInfo, extractChampStats } = require('../helpers/extractBody');

// Retrieve every champ from  db
exports.getAllChamps = async (req, res, next) => {
	try {
		const allChamps = await ChampsDAO.findAll({
			include: { model: StatsDAO, required: true }
		});
		return res.status(200).json(allChamps);
	} catch (err) {
		console.error(err);
		return res.status(500).json(err);
	}
};

// Query a champion with an specific id
exports.getChamp = async (req, res, next) => {
	const champId = req.params.id;

	try {
		const champ = await ChampsDAO.findOne({
			where: { id: champId },
			include: { model: StatsDAO, required: true }
		});
		if (!champ) {
			return res.status(404).json(
				`Could not find champion with id: ${champId}`
			);
		}
		return res.status(200).json(champ);
	} catch (err) {
		console.error(err);
		return res.status(500).json(err);
	}
};

// Create a new champion
exports.addChamp = async (req, res, next) => {
	const newChampInfo = extractChampInfo(req);
	newChampInfo.id = req.body.id;
	const newChampStats = extractChampStats(req);
	newChampStats.id = req.body.id;

	try {
		const champInfo = await ChampsDAO.create(newChampInfo);
		const champStats = await StatsDAO.create(newChampStats);
		const champ = Object.assign({}, champInfo, champStats);
		return res.status(201).json(champ);
	} catch (err) {
		console.error(err);
		return res.status(500).json(err);
	}
};

// Update champion
exports.updateChamp = async (req, res, next) => {
	const champId = req.body.id;
	const newInfo = extractChampInfo(req);
	const newStats = extractChampStats(req);

	try {
		// Check if the champ does exist
		const currInfo = await ChampsDAO.findOne({ where: { id: champId } });
		const currStats = await StatsDAO.findOne({ where: { id: champId } });
		if (!currInfo || !currStats) {
			return res.status(404).json(
				`Could not find champion with id: ${champId}`
			);
		}
		await currInfo.update(newInfo, { where: { id: champId } });
		await currStats.update(newStats, { where: { id: champId } });
		return res.status(201).json(`${champId} was updated`);
	} catch (err) {
		console.error(err);
		return res.status(500).json(err);
	}
};

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
		// Soft delete (cascade)
		await champ.destroy();
		return res.status(201).json(`${champId} was deleted`);
	} catch (err) {
		console.error(err);
		return res.status(500).json(error);
	}
};