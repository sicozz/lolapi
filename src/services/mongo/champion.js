import Champion from '../../models/mongo/champion.js';
import Rotation from '../../models/mongo/rotation.js';
import championRotation from '../../services/redis/championRotation.js';
import riotAPI from '../../helpers/riotAPI.js';
import ChampionDAO from '../../services/sql/champion.js';


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

export const getChampionsRotation = async () => {
  if (await championRotation.isCached()) {
    const rotation = await Rotation.findOne();
    return rotation;
  }
  await Rotation.deleteMany();
  const {
    freeChampionIds,
    freeChampionIdsForNewPlayers,
    maxNewPlayerLevel,
  } = await riotAPI.getChampionsRotation();

  const freeChampionNames = await Promise.all(freeChampionIds.map(
    async key => {
      const champion = await ChampionDAO.findByRemoteKey(key);
      return champion.dataValues.name;
    })
  );
  const freeChampionNamesNew = await Promise.all(freeChampionIdsForNewPlayers.map(
    async key => {
      const champion = await ChampionDAO.findByRemoteKey(key);
      return champion.dataValues.name;
    })
  );
  const data = {
    freeChampions: freeChampionNames,
    freeChampionsForNewPlayers: freeChampionNamesNew,
    maxNewPlayerLevel,
  };
  const rotation = new Rotation(data);
  await rotation.save();
  championRotation.setCached();
  return rotation;
};

export default {
  findAll,
  findByName,
  create,
  update,
  destroy,
};
