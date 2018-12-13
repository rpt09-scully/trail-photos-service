// helper functions to seed data
const faker = require('faker');
// const request = require('request');
const request = require('requestretry');
const client = require('./connection');
const fs = require('fs');

// each trail id from 1 - 100 is represented in the trailPhotos database
// not every user has a photo

// enter number of mock trails and maximum number of photos per trail below
var numSampleTrails = 100;
var maxNumPhotosPerTrail = 50;
var minNumPhotosPerTrail = 30;


// helper functions
var getRandomIntInclusive = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var insertionFactory = (trailId, trailIdPhotoNum) => {
  return new Promise ((resolve, reject) => {

    var requestPromise = new Promise((resolve, reject) => { // async process that grabs random nature photo
      let options = {
        url: 'https://source.unsplash.com/700x520/?nature,hiking',
        maxAttempts: 5,
        retryDelay: 5000
      };
      request(options, (err, res) => {
        if (err) {
          throw err;
        }
        setTimeout(() => resolve(res.request.uri.href), 2800);
      });
    });

    requestPromise.then(value => {
      var queryObject = {
        trail_id: trailId,
        user_id: getRandomIntInclusive(1, 100),
        photo_url: value,
        upload_date: faker.date.past().toISOString(),
        caption: faker.lorem.words()
      };
      queryObject.is_hero_photo = trailIdPhotoNum === 1 ? true : false;
      var {trail_id, user_id, photo_url, user_id, upload_date, caption, is_hero_photo} = queryObject;
      var postgreSQLStatement = `INSERT INTO trailPhotos(trail_id, user_id, upload_date, photo_url, caption, is_hero_photo) VALUES(${trail_id}, ${user_id}, '${upload_date}', '${photo_url}', '${caption}', ${is_hero_photo});\n`;
      fs.appendFile('database-postgresql/schema.sql', postgreSQLStatement, err => {
        if (err) { throw err; }
        console.log(`...successful insertion of photo_id for trail_id ${trail_id} into schema.sql`);
        resolve();
      });
    });
  });
};

let iterateTrailIds = async () => {
  for (var i = 1; i <= numSampleTrails; i++) {
    var random = getRandomIntInclusive(minNumPhotosPerTrail, maxNumPhotosPerTrail);
    console.log('inserting photos for trailid', i);
    for (var trailIdPhotoNum = 1; trailIdPhotoNum <= random; trailIdPhotoNum++) {
      await insertionFactory(i, trailIdPhotoNum);
    }
  }
  console.log('...mock data insertion into schema.sql complete');
  client.end();
};

iterateTrailIds();