
import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

import interactionCreate from "./events/interactionCreate.js";
import messageCreate from "./events/messageCreate.js";
import ready from "./events/ready.js";

dotenv.config();

// Setup client Discord
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Events
client.once("ready", () => { ready(client); });
client.on("messageCreate", (msg) => messageCreate(msg, client));
client.on("interactionCreate", (interaction) => interactionCreate(interaction));

client.login(process.env.TOKEN);
