import { updateLeaderboard } from "../utils/leaderboard.js";

export default function ready(client) {
  console.log(`✅ Bot online sebagai ${client.user.tag}`);
  client.guilds.cache.forEach((guild) => {
    updateLeaderboard(guild, process.env.LEADERBOARD_CHANNEL_ID);
  });
}
