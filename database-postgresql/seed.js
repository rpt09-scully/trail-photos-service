//helper functions to seed data
const csvFilePath = './preSeedData.csv';
const { Client } = require('pg');
const faker = require('faker');
const request = require('request');
const rawSeedData = require('./rawSeedData.js');

var queryObject = {};

request('https://loremflickr.com/620/520/nature', (err, res) => {
  if(err) throw err;
  queryObject.photo_url = res.request.uri.href;
})



// const client = new Client({
//   host: 'localhost',
//   database: 'trailPhotosDB',
//   port: 5432,
// })

// client.connect();

// client.query('SELECT * from trailPhotos', (err, res) => {
//   if(err) throw err;
//   console.log(res.rows[0]);
//   // client.end();
// });

// console.log(rawSeedData);


// INSERT INTO trailPhotos(trail_url, trail_id, user_id, upload_date, photo_url, caption, is_hero_photo)VALUES('www.mytrail.com',3,4,'2016-06-22 19:10:25-07','www.myphotourl.com', 'the best caption ever', true);