import db from "../database/db.js";
import { isOwner } from "../utils/checkOwner.js";

export default async function removebadword(interaction) {
  if (!isOwner(interaction)) {
    return interaction.reply({ content: "❌ no no! cuma owner yang boleh.", ephemeral: true });
  }

  const word = interaction.options.getString("word").toLowerCase();
  const result = db.prepare("DELETE FROM badwords WHERE word = ?").run(word);

  if (result.changes > 0) {
    await interaction.reply(`🗑️ **${word}** dah dihapus.`);
  } else {
    await interaction.reply(`❌ **${word}** gaada di database.`);
  }
}
