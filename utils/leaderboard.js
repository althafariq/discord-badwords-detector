import { EmbedBuilder } from "discord.js";
import db, { getConfig, setConfig } from "../database/db.js";

export async function updateLeaderboard(guild, channelId) {
  const channel = guild.channels.cache.get(channelId);
  if (!channel) return;

  const rows = db.prepare("SELECT username, count FROM toxic ORDER BY count DESC LIMIT 10").all();

  if (rows.length === 0) return;

  // 🏆 Ranking + emoji
  const medals = ["🥇", "🥈", "🥉"];
  const leaderboard = rows
    .map((row, i) => {
      const medal = medals[i] || `#${i + 1}`;
      return `${medal} **${row.username}** — ${row.count} poin`;
    })
    .join("\n");

  // Progress bar (optional)
  const maxScore = rows[0].count;
  const bar = (score) => {
    const totalBlocks = 10;
    const filled = Math.round((score / maxScore) * totalBlocks);
    return "█".repeat(filled) + "░".repeat(totalBlocks - filled);
  };

  const leaderboardWithBars = rows
    .map((row, i) => {
      const medal = medals[i] || `#${i + 1}`;
      return `${medal} **${row.username}**\n   ${bar(row.count)} (${row.count} poin)\n`;
    })
    .join("\n\n");

  const embed = new EmbedBuilder()
    .setTitle("💀 Manusia Toxic")
    .setDescription(leaderboardWithBars)
    .setColor(0x9b59b6) // ungu biar nuansa "toxic"
    .setFooter({ text: "⚡ Update otomatis setiap ada kata toxic" })
    .setTimestamp();

  // Cek apakah sudah ada pesan leaderboard sebelumnya
  const messageId = getConfig("leaderboardMessageId");
  try {
    if (messageId) {
      const msg = await channel.messages.fetch(messageId);
      await msg.edit({ embeds: [embed] });
    } else {
      const msg = await channel.send({ embeds: [embed] });
      setConfig("leaderboardMessageId", msg.id);
    }
  } catch (err) {
    console.error("❌ Gagal update leaderboard:", err);
  }
}
