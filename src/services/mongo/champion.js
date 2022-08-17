import Champion from '../../models/mongo/champion.js';

// Find all champions
const findAll = async () => {
  const champions = await Champion.find().populate('stats');
  return champions;
};

// Find champion by name
const findByName = async (championName) => {
  const champion = await Champion
    .findOne({ name: championName })
    .populate('stats');
  return champion;
};

// Add champion document
const create = async (data) => {
  const newChampion = new Champion(data);
  const createResponse = await newChampion.save();
  return createResponse;
};

// Update by champion name
const update = async (championName, data) => {
  const updatedRowsNum = await Champion.updateOne(
    { name: championName },
    data,
  );
  return updatedRowsNum;
};

// Delete row by champion name
const destroy = async (championName) => {
  const deleteResp = await Champion.deleteOne({ name: championName });
  return deleteResp;
};

export default {
  findAll,
  findByName,
  create,
  update,
  destroy,
};
