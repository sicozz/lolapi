exports.extractChampInfo = req => ({
    attack: req.body.attack,
    title: req.body.title,
    version: req.body.version,
    defense: req.body.defense,
    magic: req.body.magic,
    difficulty: req.body.difficulty
});

exports.extractChampStats = req => ({
    hp: Number(req.body.hp),
    hpperlevel: Number(req.body.hpperlevel),
    mp: Number(req.body.mp),
    mpperlevel: Number(req.body.mpperlevel),
    movespeed: Number(req.body.movespeed),
    armor: Number(req.body.armor),
    armorperlevel: Number(req.body.armorperlevel),
    spellblock: Number(req.body.spellblock),
    spellblockperlevel: Number(req.body.spellblockperlevel),
    attackrange: Number(req.body.attackrange),
    hpregen: Number(req.body.hpregen),
    hpregenperlevel: Number(req.body.hpregenperlevel),
    mpregen: Number(req.body.mpregen),
    mpregenperlevel: Number(req.body.mpregenperlevel),
    crit: Number(req.body.crit),
    critperlevel: Number(req.body.critperlevel),
    attackdamage: Number(req.body.attackdamage),
    attackdamageperlevel: Number(req.body.attackdamageperlevel),
    attackspeedoffset: Number(req.body.attackspeedoffset),
    attackspeedperlevel: Number(req.body.attackspeedperlevel) 
});