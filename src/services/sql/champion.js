import Champion from '../../models/champion.js';
import Stat from '../../models/stat.js';

// Find all champions
const findAll = async () => {
  try {
    const champions = Champion.findAll({
      include: { model: Stat, required: true }
    });
    return champions;
  } catch (err) {
    console.error(err);
  }
};

// Find champion by name
const findByName = async championName => {
  try {
    const champion = await Champion.findOne({
      where: { name: championName },
      include: { model: Stat, required: true }
    });
    return champion
  } catch (err) {
    console.error(err);
  }
};

// Add data to champion table
const create = async data => {
  try {
    const createResponse = await Champion.create(data);
    return createResponse;
  } catch (err) {
    console.error(err);
  }
};

// Update by champion name
const update = async (championName, data) => {
  try {
    const updatedRowsNum = Champion.update(
      data,
      { where: { name: championName } }
    );
    return updatedRowsNum;
  } catch (err) {
    console.error(err);
  }
};

// Delete row by champion name
const destroy = async championName => {
  try {
    const champion = await findByName(championName);
    if (!champion) {
      throw `No champion named ${championName} to be deleted`
    };

    // Soft delete (cascade)
    await champion.destroy();
  } catch (err) {
    console.error(err);
  }
};

export default {
  findAll,
  findByName,
  create,
  update,
  destroy
};
