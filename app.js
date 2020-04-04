const express = require('express');
const app = express();
const PORT = process.env.APP_URL || 8000;

app.get('/', (req, res) => {
  res.send('An alligator approaches!');
});

app.get('/hello', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, err => {
    if(err) throw err;
    console.log("%c Server running", "color: green");
});