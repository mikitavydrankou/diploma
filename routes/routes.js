// routes.js
import express from 'express';

import {sequelize} from '../lib/connectdb.js';


const router = express.Router();

// Маршрут для корневой страницы
router.get('/', (req, res) => {
  res.send('hello world');
});

router.get('/test', async (req, res) => {
    const tables = await sequelize.query("SHOW TABLES", { type: sequelize.QueryTypes.SHOWTABLES });
    res.json(tables); 

});

export default router;