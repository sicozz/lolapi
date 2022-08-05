exports.extractChampInfo = req => ({
  name: req.body.name,
  attack: req.body.attack,
  title: req.body.title,
  version: req.body.version,
  defense: req.body.defense,
  magic: req.body.magic,
  difficulty: req.body.difficulty
});

exports.extractChampStats = req => ({
  name: req.body.name,
  armor: Number(req.body.armor),
  armorperlevel: Number(req.body.armorperlevel),
  attackdamage: Number(req.body.attackdamage),
  attackdamageperlevel: Number(req.body.attackdamageperlevel),
  attackrange: Number(req.body.attackrange),
  attackspeedperlevel: Number(req.body.attackspeedperlevel),
  crit: Number(req.body.crit),
  critperlevel: Number(req.body.critperlevel),
  hp: Number(req.body.hp),
  hpperlevel: Number(req.body.hpperlevel),
  hpregen: Number(req.body.hpregen),
  hpregenperlevel: Number(req.body.hpregenperlevel),
  movespeed: Number(req.body.movespeed),
  mp: Number(req.body.mp),
  mpperlevel: Number(req.body.mpperlevel),
  mpregen: Number(req.body.mpregen),
  mpregenperlevel: Number(req.body.mpregenperlevel),
  spellblock: Number(req.body.spellblock),
  spellblockperlevel: Number(req.body.spellblockperlevel)
});
