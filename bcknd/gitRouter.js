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
    const keys = await getAllKeys('git');
    res.json(keys);
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch SDK Props keys'});
  }
});

router.get('/get-selected', async (req, res) =>
  handleGetConfig('git', 'activeGitConfig', res),
);
router.post('/get', async (req, res) => handleGetConfigBykey('git', req, res));

router.post('/save', async (req, res) =>
  handleSaveConfig('git', 'activeGitConfig', req, res),
);

router.post('/add', async (req, res) => handleAddConfig('git', req, res));

router.post('/delete', async (req, res) => handleDeleteConfig('git', req, res));
export default router;
