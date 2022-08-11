import Champion from '../../models/sql/champion.js';
import Stat from '../../models/sql/stat.js';

// Find all champions
const findAll = async () => {
  const champions = await Champion.findAll({
    include: { model: Stat, required: true }
  });
  return champions;
};

// Find champion by name
const findByName = async championName => {
  const champion = await Champion.findOne({
    where: { name: championName },
    include: { model: Stat, required: true }
  });
  return champion
};

// Add data to champion table
const create = async data => {
  const createResponse = await Champion.create(data);
  return createResponse;
};

// Update by champion name
const update = async (championName, data) => {
  const updatedRowsNum = await Champion.update(
    data,
    { where: { name: championName } }
  );
  return updatedRowsNum;
};

// Delete row by champion name
const destroy = async championName => {
  const champion = await findByName(championName);
  if (!champion) {
    throw new Error(`No champion named ${championName} to be deleted`);
  };

  // Soft delete (cascade)
  await champion.destroy();
};

export default {
  findAll,
  findByName,
  create,
  update,
  destroy
};
