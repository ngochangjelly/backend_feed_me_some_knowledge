import express from 'express';
import * as db from './db.js';


const app = express();
// app.set('port', (process.env.PORT || 5000));
app.set('port', (5000));

app.get('/', async (req, res) => {
  const dbName = "test"
  const collectionName = "articles"
  db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    // get all items
    dbCollection.find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
    });

    // << db CRUD routes >>

  }, function (err) { // failureCallback
    throw (err);
  });
  return res.status(200).send('ok');
});

app.get('/article', (req, res) => {
  res.status(200).send({ message: 'ok' });
});

app.listen(app.get('port'), err => {
  if (err) throw err;
  console.log("%c Server running", "color: green");
});