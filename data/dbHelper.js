import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

class SQLiteHelper {
  static async openDB() {
    return open({
      filename: './data/database.sqlite',
      driver: sqlite3.Database
    });
  }

  static async createTable(tableName, schema) {
    const db = await this.openDB();
    await db.exec(`CREATE TABLE IF NOT EXISTS ${tableName} (${schema})`);
    await db.close();
  }

  static async execute(query, params = []) {
    const db = await this.openDB();
    await db.run(query, params);
    await db.close();
  }

  static async fetchOne(query, params = []) {
    const db = await this.openDB();
    const result = await db.get(query, params);
    await db.close();
    return result;
  }

  static async fetchAll(query, params = []) {
    const db = await this.openDB();
    const results = await db.all(query, params);
    await db.close();
    return results;
  }
}

export default SQLiteHelper;
