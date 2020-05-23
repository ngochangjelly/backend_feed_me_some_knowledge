import express from 'express';
import * as db from './db.js';
let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');

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

axios.get('https://dev.to/aurelkurtula')
  .then((response) => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      let devtoList = [];
      $('.single-article').each(function (i, elem) {
        devtoList[i] = {
          title: $(this).find('h3').text().trim(),
          url: $(this).children('.index-article-link').attr('href'),
          tags: $(this).find('.tags').text().split('#')
            .map(tag => tag.trim())
            .filter(function (n) { return n != "" })
        }
      });
      const devtoListTrimmed = devtoList.filter(n => n != undefined)
      fs.writeFile('devtoList.json',
        JSON.stringify(devtoListTrimmed, null, 4),
        (err) => console.log('File successfully written!'))
    }
  }, (error) => console.log(err));

app.listen(app.get('port'), err => {
  if (err) throw err;
  console.log("%c Server running", "color: green");
});