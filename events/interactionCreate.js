import addbadword from "../commands/addbadword.js";
import listbadwords from "../commands/listbadwords.js";
import removebadword from "../commands/removebadword.js";

export default async function interactionCreate(interaction) {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "addbadword") return addbadword(interaction);
  if (interaction.commandName === "listbadwords") return listbadwords(interaction);
  if (interaction.commandName === "removebadword") return removebadword(interaction);
}
