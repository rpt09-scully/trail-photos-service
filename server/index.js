const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3003;


const trailPhotos = require('./trailPhotos');

app.use('/', function(req, res, next) {
  console.log("HELLO", process.env.NODE_ENV);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static('public'));

app.use('/:trailId', trailPhotos);

app.listen(port, () => console.log(`trail-photos app listening on port ${port}`));

module.exports = app;