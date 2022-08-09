import Stat from '../../models/stat.js';

// Find champion stats by champion name
const findByName = async championName => {
  try {
    const stat = await Stat.findOne({ where: { name: championName } });
    return stat
  } catch (err) {
    console.error(`Error finding stats of champion ${championName}: ${err}`);
  }
};

// Add data to stat table
const create = async data => {
  try {
    const createResponse = await Stat.create(data);
    return createResponse;
  } catch (err) {
    console.error(err);
  }
};

// Update stat by champion name
const update = async (championName, data) => {
  try {
    const updatedRowsNum = await Stat.update(
      data,
      { where: { name: championName } }
    );
    return updatedRowsNum;
  } catch (err) {
    console.error(err);
  }
};

export default {
  findByName,
  create,
  update
}
