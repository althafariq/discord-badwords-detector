import { REST, Routes, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const commands = [
  new SlashCommandBuilder()
    .setName("addbadword")
    .setDescription("Tambah kata toxic baru")
    .addStringOption(opt =>
      opt.setName("word").setDescription("Kata toxic baru").setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("listbadwords")
    .setDescription("Lihat semua kata toxic"),

  new SlashCommandBuilder()
    .setName("removebadword")
    .setDescription("Hapus kata toxic")
    .addStringOption(opt =>
      opt.setName("word").setDescription("Kata toxic yang mau dihapus").setRequired(true)
    ),
].map(cmd => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("🔄 Registering slash commands...");
    await rest.put(
      // Routes.applicationCommands(process.env.CLIENT_ID), // global (butuh 1 jam sync)
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), // lokal server cepat
      { body: commands }
    );
    console.log("✅ Slash commands registered!");
  } catch (err) {
    console.error(err);
  }
})();
