// RIOT DEVELOPER PORTAL API
const baseUrl = "http://ddragon.leagueoflegends.com"

const champUrl = (championName, version) =>
  `${baseUrl}/cdn/${version}/data/en_US/champion/${championName}.json`;

const versionsUrl = `${baseUrl}/api/versions.json`;

export default {
  champUrl,
  versionsUrl
};
