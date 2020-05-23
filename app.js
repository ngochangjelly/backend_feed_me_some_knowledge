import express from 'express';
import {insertRecord, getRecords} from './db.js';

const app = express();
// app.set('port', (process.env.PORT || 5000));
app.set('port', (5000));

app.get('/', (req, res) => {
  getRecords()
  return res.send({foo: 'bar'});
});

app.get('/hello', (req, res) => {
  res.status(200).send({message: 'ok'});
});

app.listen(app.get('port'), err => {
    if(err) throw err;
    console.log("%c Server running", "color: green");
});