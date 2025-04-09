import express from 'express';
const router = express.Router();
import {
  handleGetConfig,
  handleAddConfig,
  handleDeleteConfig,
  handleGetConfigBykey,
  handleSaveConfig,
} from './dataUtils.js';

import {
    getAllKeys
} from "./../data/database.js"

router.get('/get-keys', async (req, res) => {
  try {
    const keys = await getAllKeys('sdkprops');
    res.json(keys);
  } catch (err) {
    console.log(err)
    res.status(500).json({error: 'Failed to fetch SDK Props keys'});
  }
});

router.get('/get-selected', async (req, res) =>
  handleGetConfig('sdkprops', 'activeSdkProps', res),
);
router.post('/get', async (req, res) =>
  handleGetConfigBykey('sdkprops', req, res),
);

router.post('/save', async (req, res) =>
  handleSaveConfig('sdkprops', 'activeSdkProps', req, res),
);

router.post('/add', async (req, res) =>
  handleAddConfig('sdkprops', req, res),
);

router.post('/delete', async (req, res) =>
  handleDeleteConfig('sdkprops', req, res),
);
export default router;
