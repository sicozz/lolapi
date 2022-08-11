import Champion from '../../models/mongo/champion.js';

// Find all champions
const findAll = async () => {
  const champions = await Champion.find();
  return champions;
};

// Find champion by name
const findByName = async championName => {
  const champion = await Champion.findOne({ name: championName });
  return champion;
};

// Add data to champion table
const create = async data => {
  const createResponse = await Champion.save(data);
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
const destroy = async championName => {
  const deleteResp = await Champion.deleteOne({ name: championName });
  return deleteResp;
};

export default {
  findAll,
  findByName,
  create,
  update,
  destroy
};
