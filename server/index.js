const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT;


const trailPhotos = require('./trailPhotos')

app.use(express.static('public'));

app.use('/:trailId', trailPhotos);

app.listen(port, () => console.log(`trail-photos app listenting on port ${port}`));

module.exports = app;