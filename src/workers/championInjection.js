// Inject champions from champion.json into loldb
import fs from 'fs';
import readline from 'readline';

import Redis from 'redis';
import axios from 'axios';

const filePath = './champion.json';
const validProperties = Object.freeze({
  armor: true,
  armorperlevel: true,
  attack: true,
  attackdamage: true,
  attackdamageperlevel: true,
  attackrange: true,
  attackspeed: true,
  attackspeedoffset: true,
  attackspeedperlevel: true,
  crit: true,
  critperlevel: true,
  defense: true,
  difficulty: true,
  hp: true,
  hpperlevel: true,
  hpregen: true,
  hpregenperlevel: true,
  key: true,
  magic: true,
  movespeed: true,
  mp: true,
  mpperlevel: true,
  mpregen: true,
  mpregenperlevel: true,
  name: true,
  spellblock: true,
  spellblockperlevel: true,
  title: true,
  version: true,
});

const redisClient = Redis.createClient(6379, '127.0.0.1');

const openingRg = /^.+[{|\[)]$/;
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
  terminal: false,
});

file.on('line', line => {
  lineNum += 1;

  // Closing depth level
  if (closingRg.exec(line) !== null) {
    stack -= 1;

    // Load champion
    if (stack === 0) {
      loadedChampions.push(currChampion);
      currChampion = {};
    }

    // Inject 10 loaded champions
    if (loadedChampions.length === 10) {
      for (const champion of loadedChampions) {
        redisClient.set(champion.name, champion.version);
        axios.post('http://localhost:3000/sql/champion', champion);
      }
      redisClient.set('lastLoadedLine', lineNum);
      loadedChampions.splice(0, loadedChampions.length);
    }
  }

  // Opening depth level
  else if (openingRg.exec(line) !== null) {
    stack += 1;
  }

  // Base state -> add base attributes
  else if (stack !== 0) {
    const property = propertyRg.exec(line)[1];

    if (valueRg.exec(line) === null) {
      return;
    }

    if (validProperties[property]) {
      const value = valueRg.exec(line)[1];
      currChampion[property] = value;
    }
  }
});

file.on('close', () => {
  console.log(`There are ${loadedChampions.length} champions left to inject`);
  for (const champion of loadedChampions) {
    redisClient.set(champion.name, champion.version);
    axios.post('http://localhost:3000/sql/champion', champion);
  }
  redisClient.set('lastLoadedLine', lineNum);
  loadedChampions.splice(0, loadedChampions.length);
  redisClient.quit();
});
