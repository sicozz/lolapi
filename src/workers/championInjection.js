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

const redisClient = Redis.createClient(6379, '127.0.0.1');

const openingRg = /^.*[{|\[)]$/;
const closingRg = /^\s*(?:}|\]),?$/;
const propertyRg = /\s+"([^":]+)/;
const valueRg = /\s*"[^:]+:\s"?([^",{\[]+)/;

let lineNum = 0;
let stack = 0;
const loadedChampions = [];
let currChampion = {};

const file = readline.createInterface({
  input: fs.createReadStream(filePath),
  output: process.stdout,
  terminal: false
});

file.on('line', line => {
  lineNum++;

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
      for (champion of loadedChampions) {
        redisClient.set(champion.name, champion.version);
      }
      redisClient.set("lastLoadedLine", lineNum);
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
});

file.on('close', () => {
  console.log(`There are ${loadedChampions.length} champions to inject`);
  for (champion of loadedChampions) {
    redisClient.set(champion.name, champion.version);
  }
  redisClient.set("lastLoadedLine", lineNum);
  loadedChampions.splice(0, loadedChampions.length);
  redisClient.quit();
});
