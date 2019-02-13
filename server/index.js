const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3003;

const trailPhotos = require('./trailPhotos');

app.use('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/:trailId(\\d+$)*?', function (req, res) {
  res.status(200).sendFile(path.resolve(__dirname + '/../public/index.html'));
});

app.use(express.static('public'));

app.use('/:trailId', trailPhotos);

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(new Date(), `trail-photos app listening on port ${port}`));

module.exports = app;