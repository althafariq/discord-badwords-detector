import db from "../database/db.js";
import { isOwner } from "../utils/checkOwner.js";

export default async function addbadword(interaction) {
  if (!isOwner(interaction)) {
    return interaction.reply({ content: "❌ no no! cuma owner yang boleh.", ephemeral: true });
  }

  const word = interaction.options.getString("word").toLowerCase();

  try {
    db.prepare("INSERT INTO badwords (word) VALUES (?)").run(word);
    await interaction.reply(`✅ **${word}** dah ditambahin ke database`);
  } catch {
    await interaction.reply(`⚠️ **${word}** udah ada di database.`);
  }
}
