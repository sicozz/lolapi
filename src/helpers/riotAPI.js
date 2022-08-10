// RIOT DEVELOPER PORTAL API
const baseUrl = "http://ddragon.leagueoflegends.com"

// Champion data
const champUrl = (championName, version) =>
  `${baseUrl}/cdn/${version}/data/en_US/champion/${championName}.json`;

// Versions list
const versionsUrl = `${baseUrl}/api/versions.json`;

// Champion latest data
const getChampionLstVersion = async championName => {
  const riotVersions = await axios.get(riotAPI.versionsUrl);
  const lstVersion = riotVersions.data[0];
  const champion = await axios.get(
    riotAPI.champUrl(championName, lstVersion)
  );
  return champion;
};

export default {
  champUrl,
  versionsUrl,
  getChampionLstVersion
};
