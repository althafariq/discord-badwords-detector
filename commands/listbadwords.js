import db from "../database/db.js";
import { isOwner } from "../utils/checkOwner.js";

export default async function listbadwords(interaction) {
  if (!isOwner(interaction)) {
    return interaction.reply({ content: "❌ no no! cuma owner yang boleh.", ephemeral: true });
  }
  
  const rows = db.prepare("SELECT word FROM badwords ORDER BY word ASC").all();

  if (rows.length === 0) {
    return interaction.reply("📭 Belum ada kata toxic yang terdaftar.");
  }

  const list = rows.map((row, i) => `${i + 1}. ${row.word}`).join("\n");

  await interaction.reply(`📃 list diksi tidak terpelajar:\n\`\`\`\n${list}\n\`\`\``);
}
