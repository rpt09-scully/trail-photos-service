const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT;
const db = require('../database-postgresql/helpers');

app.use(express.static('public'));

app.get('/:trailId/photos', (req, res) => {
  var sortOrder = req.query.sort || null;
  db.getPhotos(req.params.trailId, sortOrder, result => {
    res.send(result);
  });
});

app.get('/:trailId/photosCount', (req, res) => {
  db.getPhotosCount(req.params.trailId, result => {
    res.send(result);
  });
});

app.get('/:trailId/heroPhoto', (req, res) => {
  db.getHeroPhoto(req.params.trailId, result => {
    res.send(result);
  });
});

app.listen(port, () => console.log(`trail-photos app listenting on port ${port}`));


