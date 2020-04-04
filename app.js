const express = require('express');
const app = express();
app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
  res.send('An alligator approaches!');
});

app.get('/hello', (req, res) => {
  res.send('Hello world');
});

app.listen(app.get('port'), err => {
    if(err) throw err;
    console.log("%c Server running", "color: green");
});