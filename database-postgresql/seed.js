// helper functions to seed data
const { Client } = require('pg');
const faker = require('faker');
const request = require('request');
const rawSeedData = require('./rawSeedData.js');

// each trail id from 1 - 100 is represented in the trailPhotos database
// not every user has a photo

const client = new Client({
  host: 'localhost',
  database: 'trailPhotosDB',
  port: 5432,
})

client.connect();

// enter number of mock trails and maximum number of photos per trail below
var numSampleTrails = 100;
var maxNumPhotosPerTrail = 5;


// helper functions
var getRandomIntInclusive = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var insertionFactory = (trailId, i) => {
  return new Promise ((resolve, reject) => {

    var requestPromise = new Promise((resolve, reject) => { // async process that grabs random nature photo
      request('https://loremflickr.com/700/520/nature', (err, res) => {
        if(err) throw err;
        resolve(res.request.uri.href);
      })
    });

    requestPromise.then(value => {
      var queryObject = {};
      queryObject.trail_id = trailId;
      queryObject.user_id = getRandomIntInclusive(1, 100);
      queryObject.photo_url = value;
      queryObject.upload_date = faker.date.past();
      queryObject.caption = faker.lorem.words();
      queryObject.is_hero_photo = i === 1 ? true : false;
      var {trail_id, user_id, photo_url, user_id, upload_date, caption, is_hero_photo} = queryObject;
      var postgreSQLStatement = 'INSERT INTO trailPhotos(trail_id, user_id, upload_date, photo_url, caption, is_hero_photo) VALUES($1, $2, $3, $4, $5, $6)';
      client.query(postgreSQLStatement, [trail_id, user_id, upload_date, photo_url, caption, is_hero_photo], (err, res) => { // async db table insertion
        if(err) throw err;
        console.log('...successfull insertion');
        resolve();
      });
    });
  })
}

async function iterateTrailIds(){
  for(var i = 1; i <= numSampleTrails; i++){
    var random = getRandomIntInclusive(1, maxNumPhotosPerTrail);
    console.log('inserting photos for trailid', i);
    for(var j = 1; j <= random; j++){
      await insertionFactory(i, j);
    }
  }
  console.log('...mock data insertion complete');
  client.end();
}

iterateTrailIds();