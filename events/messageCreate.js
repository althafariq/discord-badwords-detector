import db from "../database/db.js";
import { updateLeaderboard } from "../utils/leaderboard.js";


function normalize(text) {
  return text.toLowerCase()
    .replace(/(.)\1{2,}/g, "$1")
    .replace(/[@4]/g, "a")
    .replace(/\$/g, "s")
    .replace(/[0]/g, "o")
    .replace(/[1!]/g, "i")
    .replace(/[3]/g, "e")
    .replace(/[7]/g, "t")
    // hapus semua simbol non-alfabet
    .replace(/[^a-z\s]/g, " ");;
}

export default async function messageCreate(message, client) {
  if (message.author.bot) return;

  // Halo + mention bot
  if (message.content.toLowerCase().includes("halo") && message.mentions.has(client.user)) {
    return message.reply("halo juga 👋");
  }

  // Ambil semua badwords dari database
  const badWords = db.prepare("SELECT word FROM badwords").all().map(r => r.word);

  let msg = normalize(message.content);

  function containsBadword(message, badWords) {
    for (let word of badWords) {
      const regex = new RegExp(`\\b${word}\\b`, "i");
      if (regex.test(message)) {
        return word;
      }
    }
    return null;
  }

  let found = containsBadword(msg, badWords);
  
  if (found) {
    let userId = message.author.id;
    let username = message.author.username;

    let user = db.prepare("SELECT * FROM toxic WHERE userId = ?").get(userId);
    if (user) {
      db.prepare("UPDATE toxic SET count = count + 1, username = ? WHERE userId = ?").run(username, userId);
    } else {
      db.prepare("INSERT INTO toxic (userId, username, count) VALUES (?, ?, 1)").run(userId, username);
    }

    message.reply(`⚠️ Mulutnya dijaga, **${username}** 😡 \n\n(kata kasar terdeteksi: **${found}**)`);

    updateLeaderboard(message.guild, process.env.LEADERBOARD_CHANNEL_ID);
  }

}
