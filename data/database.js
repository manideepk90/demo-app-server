import SQLiteHelper from './dbHelper.js';

async function createEnv() {
  try {
    await SQLiteHelper.createTable(
      'environment',
      `
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT,
        publishableKey TEXT UNIQUE,
        secretKey TEXT,
        profileId TEXT
      `,
    );
    console.log('Environment table initialized!');
  } catch (err) {
    console.log('Environment table init failed!', err);
  }
}

async function createPropsTable(table) {
  try {
    await SQLiteHelper.createTable(
      table,
      `
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE,
        json TEXT, 
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      `,
    );
    console.log(`${table} table initialized!`);
  } catch (err) {
    console.log(`${table} table init failed!`, err);
  }
}

async function createActiveServer() {
  try {
    await SQLiteHelper.createTable(
      'activeserver',
      `
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE,
        activeSdkProps TEXT,
        activeServerConfig TEXT,
        activeGitConfig TEXT,
        activeEnvConfig TEXT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      `,
    );
    console.log('Active Server table initialized!');

    // Initialize default active server entry
    await initializeActiveServer();
  } catch (err) {
    console.log('Active Server table init failed!', err);
  }
}

async function initializeActiveServer() {
  try {
    await SQLiteHelper.execute(
      `INSERT INTO activeserver (key, activeSdkProps, activeServerConfig, activeGitConfig, activeEnvConfig, createdAt, updatedAt)
       VALUES ('active', '', '', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       ON CONFLICT(key) DO NOTHING`,
    );
    console.log('Active Server initialized with default values!');
  } catch (err) {
    console.log('Failed to initialize Active Server!', err);
  }
}

async function getAllKeys(table) {
  return await SQLiteHelper.fetchAll(`SELECT key FROM ${table}`);
}

async function getItemByKey(table, key) {
  return await SQLiteHelper.fetchOne(`SELECT * FROM ${table} WHERE key = ?`, [
    key,
  ]);
}

async function getCount(table) {
  return await SQLiteHelper.fetchOne();
}

async function addJsonToTable(table, key, json) {
  try {
    await SQLiteHelper.execute(
      `INSERT INTO ${table} (key, json) VALUES (?, ?) 
       ON CONFLICT(key) DO UPDATE SET 
         json = excluded.json, 
         updatedAt = CURRENT_TIMESTAMP`,
      [key, JSON.stringify(json)],
    );
    console.log(`Entry added/updated in ${table}!`);
  } catch (err) {
    console.log(`Failed to add/update entry in ${table}!`, err);
  }
}

async function setActiveServerKey(column, value) {
  try {
    await SQLiteHelper.execute(
      `UPDATE activeserver SET ${column} = ?, updatedAt = CURRENT_TIMESTAMP WHERE key = 'active'`,
      [value],
    );
    console.log(`Active server ${column} updated!`);
  } catch (err) {
    console.log(`Failed to update active server ${column}!`, err);
  }
}

async function deleteItem(table, key) {
  await SQLiteHelper.execute(`DELETE FROM ${table} WHERE key = ?`, [key]);
}

async function getActiveServer() {
  return await SQLiteHelper.fetchOne(
    `SELECT * FROM activeserver WHERE key = 'active'`,
  );
}

async function setup() {
  await createEnv();
  await createPropsTable('sdkprops');
  await createPropsTable('server');
  await createPropsTable('git');
  await createActiveServer();
}

export {
  setup,
  getAllKeys,
  getItemByKey,
  addJsonToTable,
  setActiveServerKey,
  getActiveServer,
  deleteItem,
};
