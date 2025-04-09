import {
    getActiveServer,
    getItemByKey,
    setActiveServerKey,
    addJsonToTable,
    deleteItem
} from "./../data/database.js"

async function handleGetConfig(table, column, res) {
  try {
    const active = await getActiveServer();
    console.log('Active Config', active);
    const key = active?.[column];
    const item = await getItemByKey(table, key);
    if (item) {
      return res.json(item);
    } else {
      res.status(500).json({message: `No data found`});
    }
  } catch (err) {
    res.status(500).json({error: `Failed to fetch selected ${table}`});
  }
}

async function handleGetConfigBykey(table, req, res) {
  try {
    const {key} = req.body;
    const item = await getItemByKey(table, key);
    if (item) {
      return res.json(item);
    } else {
      throw Error('no data found');
    }
  } catch (err) {
    res.status(500).json({error: `Failed to fetch selected ${table}`});
  }
}

async function handleSaveConfig(table, column, req, res) {
  const {key, json} = req.body;
  console.log(json)
  if (!key || Object.keys(json).length == 0) {
    return res.status(500).json({error: `Failed to save ${table} config`});
  }
  try {
    await addJsonToTable(table, key, json);
    await setActiveServerKey(column, key);
    res.json({message: `${table} config saved and set active`});
  } catch (err) {
    res.status(500).json({error: `Failed to save ${table} config`});
  }
}

async function handleAddConfig(table, req, res) {
  const {key, json} = req.body;
  if (!key || Object.keys(json).length == 0) {
    return res.status(500).json({error: `Failed to save ${table} config`});
  }
  try {
    await addJsonToTable(table, key, json);
    res.json({message: `${table} config added`});
  } catch (err) {
    res.status(500).json({error: `Failed to add ${table} config`});
  }
}

async function handleDeleteConfig(table, req, res) {
  const {key} = req.body;
  try {
    if (!key) {
      return res.status(500).json({error: `key is empty`});
    }
    deleteItem(table, key);
    res.json({message: `${table} config deleted`});
  } catch (err) {
    res.status(500).json({error: `Failed to delete ${table} config`});
  }
}
export {
  handleGetConfig,
  handleAddConfig,
  handleDeleteConfig,
  handleGetConfigBykey,
  handleSaveConfig,
};
