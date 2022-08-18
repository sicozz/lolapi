import UserChampion from '../models/userChampion.js';
import User from '../models/user.js';
import Champion from '../models/sql/champion.js';

const findUserChampions = async (userId) => {
  const champions = await User.findAll({
    attributes: [],
    where: { id: userId },
    include: {
      model: Champion,
      attributes: ['name'],
      required: true,
    },
  });
  return champions;
};

export default {
  findUserChampions,
};
