import axios from 'axios';

// DDRAGON API
const baseUrl = 'http://ddragon.leagueoflegends.com';

// RIOT DEVELOPER PORTAL
const rdp = 'https://la1.api.riotgames.com/lol/platform/v3';

// Champion data
const champUrl = (championName, version) => `${baseUrl}/cdn/${version}/data/en_US/champion/${championName}.json`;

// Versions list
const versionsUrl = `${baseUrl}/api/versions.json`;

// Champion latest data
const getChampionLstVersion = async championName => {
  const riotVersions = await axios.get(versionsUrl);
  const lstVersion = riotVersions.data[0];
  const champion = await axios.get(champUrl(championName, lstVersion));
  return champion;
};

// Champion rotation
const getChampionsRotation = async () => {
  const resp = await axios.get(
    `${rdp}/champion-rotations`,
    { headers: { "X-Riot-Token": process.env.RIOT_KEY, } }
  );
  return resp.data;
};

export default {
  champUrl,
  versionsUrl,
  getChampionLstVersion,
  getChampionsRotation,
};
