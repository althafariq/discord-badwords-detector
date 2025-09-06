import Database from "better-sqlite3";

// Setup database SQLite
const db = new Database("toxic.db");

// Buat tabel kalau belum ada
db.prepare(`
CREATE TABLE IF NOT EXISTS toxic (
    userId TEXT PRIMARY KEY,
    username TEXT,
    count INTEGER DEFAULT 0
)
`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT
)
`).run();

// 🔥 Tabel badwords
db.prepare(`
CREATE TABLE IF NOT EXISTS badwords (
    word TEXT PRIMARY KEY
)
`).run();

// Helper config
export function setConfig(key, value) {
  db.prepare("INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)").run(key, value);
}

export function getConfig(key) {
  let row = db.prepare("SELECT value FROM config WHERE key = ?").get(key);
  return row ? row.value : null;
}

// Insert default badwords kalau masih kosong
const defaultWords = ["anjing", "tolol", "goblok", "kontol", "pepek", "memek", "asu", "bangsat", "bgst", "ajg", "puki", "ngentot", "ngntot", "lonte", "pelacur"];;
const exists = db.prepare("SELECT COUNT(*) AS c FROM badwords").get();
if (exists.c === 0) {
  const insert = db.prepare("INSERT OR IGNORE INTO badwords (word) VALUES (?)");
  for (let w of defaultWords) insert.run(w);
}


export default db;