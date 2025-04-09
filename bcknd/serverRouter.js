import express from 'express';
const router = express.Router();
import {
  handleGetConfig,
  handleAddConfig,
  handleDeleteConfig,
  handleGetConfigBykey,
  handleSaveConfig,
} from './dataUtils.js';
import {getAllKeys} from './../data/database.js';

router.get('/get-keys', async (req, res) => {
  try {
    const keys = await getAllKeys('server');
    res.json(keys);
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch SDK Props keys'});
  }
});

router.get('/get-selected', async (req, res) => {
  handleGetConfig('server', 'activeServerConfig', res);
});

router.post('/get', async (req, res) =>
  handleGetConfigBykey('server', req, res),
);

router.post('/save', (req, res) =>
  handleSaveConfig('server', 'activeServerConfig', req, res),
); // it will update the existing key or create new one

router.post('/add', (req, res) => handleAddConfig('server', req, res));

router.post('/delete', (req, res) => handleDeleteConfig('server', req, res));
export default router;
