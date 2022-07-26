export const extractChampInfo = (rawObject) => ({
  name: rawObject.name,
  remoteKey: Number(rawObject.key),
  attack: Number(rawObject.attack),
  title: rawObject.title,
  version: rawObject.version,
  defense: Number(rawObject.defense),
  magic: Number(rawObject.magic),
  difficulty: Number(rawObject.difficulty),
  image: rawObject.image,
});

export const extractChampStats = (rawObject) => ({
  name: rawObject.name,
  armor: Number(rawObject.armor),
  armorperlevel: Number(rawObject.armorperlevel),
  attackdamage: Number(rawObject.attackdamage),
  attackdamageperlevel: Number(rawObject.attackdamageperlevel),
  attackrange: Number(rawObject.attackrange),
  attackspeedperlevel: Number(rawObject.attackspeedperlevel),
  crit: Number(rawObject.crit),
  critperlevel: Number(rawObject.critperlevel),
  hp: Number(rawObject.hp),
  hpperlevel: Number(rawObject.hpperlevel),
  hpregen: Number(rawObject.hpregen),
  hpregenperlevel: Number(rawObject.hpregenperlevel),
  movespeed: Number(rawObject.movespeed),
  mp: Number(rawObject.mp),
  mpperlevel: Number(rawObject.mpperlevel),
  mpregen: Number(rawObject.mpregen),
  mpregenperlevel: Number(rawObject.mpregenperlevel),
  spellblock: Number(rawObject.spellblock),
  spellblockperlevel: Number(rawObject.spellblockperlevel),
});

export const extractRemoteChamp = (riotResp, champName) => {
  const info = extractChampInfo(riotResp.data[champName].info);
  const stats = extractChampStats(riotResp.data[champName].stats);
  return {

    ...info,
    ...stats,
    name: riotResp.data[champName].name,
    title: riotResp.data[champName].title,
    version: riotResp.version,
  };
};
