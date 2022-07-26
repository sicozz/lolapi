import fs from 'fs';
import xlsx from 'xlsx';

import UserChampion from '../models/userChampion.js';
import User from '../models/user.js';
import Champion from '../models/sql/champion.js';
import { getChampionsRotation } from '../services/mongo/champion.js';

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
    await UserChampion.create({ UserId: userId, ChampionId: champion.id });
  });
  fs.unlinkSync(filePath);
  return;
};

const getChampionsXLSX = async userId => {
  const championsData = await findUserChampions(userId);
  const champions = championsData ?
    [] :
    championsData[0]['Champions']
      .map(champion => ({ Champion: champion.name }));

  let workbook = xlsx.utils.book_new();
  const sheet = xlsx.utils.json_to_sheet(champions);
  xlsx.utils.book_append_sheet(workbook, sheet);
  const fileName = `./uploads/xlsx/${Date.now()}.xlsx`
  xlsx.writeFile(workbook, fileName);
  return fileName;
};

const playableChampionsXLSX = async filePath => {
  const {
    freeChampions,
    freeChampionsForNewPlayers,
    maxNewPlayerLevel,
  } = await getChampionsRotation();

  const file = xlsx.readFile(filePath);
  const sheet = file.Sheets[file.SheetNames[0]];
  const jsonSheet = xlsx.utils.sheet_to_json(sheet);
  const answers = jsonSheet.map(row => {
    const { level, champion } = row;
    return {
      champion,
      available: level > maxNewPlayerLevel ?
        freeChampions.includes(champion) :
        freeChampionsForNewPlayers.includes(champion)
    };
  });
  const answersSheet = xlsx.utils.json_to_sheet(answers);
  xlsx.utils.book_append_sheet(file, answersSheet, 'answers');
  return xlsx.writeFile(file, filePath);
};

export default {
  findUserChampions,
  addChampionsXLSX,
  getChampionsXLSX,
  playableChampionsXLSX,
};
