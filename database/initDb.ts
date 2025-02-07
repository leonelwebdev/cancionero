import { type SQLiteDatabase } from "expo-sqlite";

export async function initDb(db: SQLiteDatabase) {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS alabanzas (
        id INTEGER PRIMARY KEY NOT NULL,
        nombre TEXT,
        acordes TEXT,
        letra TEXT,
        categoria TEXT,
        esFavorita BOOLEAN
      );
    `);
  } catch (error) {
    console.error(error);
  }

  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS reuniones (
        id INTEGER PRIMARY KEY NOT NULL,
        nombre TEXT,
        fecha TEXT,
        lugar TEXT,
        predicador TEXT
      );
    `);
  } catch (error) {
    console.error(error);
  }
}
