const express = require('express');
const router = express.Router({mergeParams: true});
const db = require('../database-postgresql/helpers');


router.get('/photos', (req, res, next) => {
  var sortOrder = req.query.sort || null;
  var validSortOrder = ['asc', 'desc', null];
  if (!validSortOrder.includes(sortOrder)) {
    res.status(400).end('Invalid sort order');
  } else {
    db.getPhotos(req.params.trailId, sortOrder, result => {
      if (result instanceof Error) {
        next(result);
      } else {
        res.send(result);
      }
    });
  }
});

router.get('/photosCount', (req, res, next) => {
  db.getPhotosCount(req.params.trailId, result => {
    if (result instanceof Error) {
      next(result);
    } else {
      res.send(result);
    }
  });
});

router.get('/heroPhoto', (req, res, next) => {
  db.getHeroPhoto(req.params.trailId, result => {
    if (result instanceof Error) {
      next(result);
    } else {
      res.send(result);
    }
  });
});

//For testing
module.exports = router;
