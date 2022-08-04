// Inject champions from champion.json into loldb
const Redis = require('redis');
const fs = require('fs');
const readline = require('readline');

const filePath = './champion.json'
const validProperties = new Set([
  "name",
  "version",
  "title",
  "attack",
  "defense",
  "magic",
  "difficulty",
  "hp",
  "hpperlevel",
  "mp",
  "mpperlevel",
  "movespeed",
  "armor",
  "armorperlevel",
  "spellblock",
  "spellblockperlevel",
  "attackrange",
  "hpregen",
  "hpregenperlevel",
  "mpregen",
  "mpregenperlevel",
  "crit",
  "critperlevel",
  "attackdamage",
  "attackdamageperlevel",
  "attackspeedperlevel",
  "attackspeed"
]);

// const redisClient = Redis.createClient(6379, '127.0.0.1');

/*
 * The fields of interest are:
 * name
 * version
 * title
 * info.attack
 * info.defense
 * info.magic
 * info.difficulty
 * stats.hp
 * stats.hpperlevel
 * stats.mp
 * stats.mpperlevel
 * stats.movespeed
 * stats.armor
 * stats.armorperlevel
 * stats.spellblock
 * stats.spellblockperlevel
 * stats.attackrange
 * stats.hpregen
 * stats.hpregenperlevel
 * stats.mpregen
 * stats.mpregenperlevel
 * stats.crit
 * stats.critperlevel
 * stats.attackdamage
 * stats.attackdamageperlevel
 * stats.attackspeedperlevel
 * stats.attackspeed
 */

const openingRg = /^.*[{|\[)]$/;
const closingRg = /^\s*(?:}|\]),?$/;
const propertyRg = /\s+"([^":]+)/;
const valueRg = /\s*"[^:]+:\s"?([^",{\[]+)/;

let stack = 0;
const loadedChampions = [];
let currChampion = {};

const file = readline.createInterface({
  input: fs.createReadStream(filePath),
  output: process.stdout,
  terminal: false
});

file.on('line', line => {
  // If closing brace pop state
  //
  // If state empty then push a champion
  // If state champion check the attribute
  // // If attribute is in base interest -> add it
  // // If attribute is info -> push info to state
  // // If attribute is stats -> push stats to state
  // // Else -> pass
  // If state info -> add attribute
  // If state stats -> add attribute

  // First line special case
  if (line == "{") {
    return
  }

  // Closing depth level
  else if (closingRg.exec(line) !== null) {
    stack--;

    // Load champion
    if (stack === 0) {
      loadedChampions.push(currChampion);
      currChampion = {};
    }

    // Inject 10 loaded champions
    if (loadedChampions.length == 10) {
      console.log("Injection time");
      loadedChampions.splice(0, loadedChampions.length);
    }
  }

  // Opening depth level
  else if (openingRg.exec(line) !== null) {
    stack++;
  }

  //  Base state -> add base attributes
  else if (stack != 0) {
    const property = propertyRg.exec(line)[1];

    if (valueRg.exec(line) === null) {
      return
    }

    if (validProperties.has(property)) {
      const value = valueRg.exec(line)[1];
      currChampion[property] = value;
    }
  }
})

file.on('close', () => {
  console.log(`There are ${loadedChampions.length} champions to inject`);
});
