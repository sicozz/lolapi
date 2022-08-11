// Inject champions from champion.json into loldb
import fs from 'fs';
import readline from 'readline';

import Redis from 'redis';
import axios from 'axios';

const filePath = './champion.json'
const validProperties = Object.freeze({
  name: true,
  version: true,
  title: true,
  attack: true,
  defense: true,
  magic: true,
  difficulty: true,
  hp: true,
  hpperlevel: true,
  mp: true,
  mpperlevel: true,
  movespeed: true,
  armor: true,
  armorperlevel: true,
  spellblock: true,
  spellblockperlevel: true,
  attackrange: true,
  hpregen: true,
  hpregenperlevel: true,
  mpregen: true,
  mpregenperlevel: true,
  crit: true,
  critperlevel: true,
  attackdamage: true,
  attackdamageperlevel: true,
  attackspeedoffset: true,
  attackspeedperlevel: true,
  attackspeed: true
});

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
    if (loadedChampions.length === 10) {
      for (let champion of loadedChampions) {
        redisClient.set(champion.name, champion.version);
        const resp = axios.post('http://localhost:3000/sql/champion', champion);
      }
      redisClient.set("lastLoadedLine", lineNum);
      loadedChampions.splice(0, loadedChampions.length);
    }
  }

  // Opening depth level
  else if (openingRg.exec(line) !== null) {
    stack++;
  }

  // Base state -> add base attributes
  else if (stack != 0) {
    const property = propertyRg.exec(line)[1];

    if (valueRg.exec(line) === null) {
      return
    }

    if (validProperties[property]) {
      const value = valueRg.exec(line)[1];
      currChampion[property] = value;
    }
  }
});

file.on('close', () => {
  console.log(`There are ${loadedChampions.length} champions left to inject`);
  for (let champion of loadedChampions) {
    redisClient.set(champion.name, champion.version);
    axios.post('http://localhost:3000/sql/champion', champion);
  }
  redisClient.set("lastLoadedLine", lineNum);
  loadedChampions.splice(0, loadedChampions.length);
  redisClient.quit();
});
