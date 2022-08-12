import Stat from '../../models/mongo/stat.js';

// Find champion stats by champion name
const findByName = async championName => {
  const champion = await Stat.findOne({ name: championName });
  return champion;
};

// Add stat document
const create = async data => {
  const newStat = new Stat(data);
  const createResponse = await newStat.save();
  return createResponse;
};

// Update stat by champion name
const update = async (championName, data) => {
  const updatedRowsNum = await Stat.updateOne(
    { name: championName },
    data,
  );
  return updatedRowsNum;
};

export default {
  findByName,
  create,
  update
}
