import xlsx from 'xlsx';

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

const addChampionsXLSX = async (userId, filePath) => {
  const file = xlsx.readFile(filePath);
  const sheet = file.Sheets[file.SheetNames[0]];
  const jsonSheet = xlsx.utils.sheet_to_json(sheet);
  jsonSheet.forEach(async row => {
    const championName = row.Champion;
    const champion = await Champion.findOne({
      attributes: ['id'],
      where: { name: championName },
    });
    console.log(`${championName}: ${champion.id}`);
    await UserChampion.create({ UserId: userId, ChampionId: champion.id });
  });
  return 'Add champions not implemented yet';
};

export default {
  findUserChampions,
  addChampionsXLSX,
};
