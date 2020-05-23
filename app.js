import express from 'express';
import { getRecords } from './db.js';

const app = express();
// app.set('port', (process.env.PORT || 5000));
app.set('port', (5000));

app.get('/', async (req, res) => {
  const records = await getRecords()
  return res.status(200).send(records);
});

app.get('/article', (req, res) => {
  res.status(200).send({ message: 'ok' });
});

app.listen(app.get('port'), err => {
  if (err) throw err;
  console.log("%c Server running", "color: green");
});