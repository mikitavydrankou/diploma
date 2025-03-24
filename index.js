import express from 'express';
import routes from './routes/routes.js';
import { sequelize } from './lib/connectdb.js';
import cors from 'cors';

export const app = express();
const port = 3000

app.use(cors());

app.use('/', routes)  ;
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}, address http://localhost:${port}`)
})