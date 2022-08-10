import Stat from '../../models/stat.js';

// Find champion stats by champion name
const findByName = async championName => {
  const stat = await Stat.findOne({ where: { name: championName } });
  return stat
};

// Add data to stat table
const create = async data => {
  const createResponse = await Stat.create(data);
  return createResponse;
};

// Update stat by champion name
const update = async (championName, data) => {
  const updatedRowsNum = await Stat.update(
    data,
    { where: { name: championName } }
  );
  return updatedRowsNum;
};

export default {
  findByName,
  create,
  update
}
