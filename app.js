const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

app.listen(process.env.APP_URL, () => console.log('Gator app listening on port!'));
