import dotenv from "dotenv";
dotenv.config();

export function isOwner(interaction) {
  return interaction.user.id === process.env.OWNER_ID;
}
