const fs = require('fs');
const csv = require('fast-csv');
const faker = require('faker');
const fetch = require('node-fetch');
const Unsplash = require('unsplash-js').default;

// global.fetch = fetch;

// const unsplash = new Unsplash({
//   applicationId: '8002c2c03d9c022cc13eeabbdab8897378c050706471de506a540a3cb8ff30d7',
//   secret: 'cf26d01c34c59c9285399cf061aa1866f0d33504c9c6bdefa125af67fc6ce03d',
//   callbackUrl: 'http://yourusername.com'
// });





// const getPhotos = (page) => {

//   unsplash.search.photos('hiking, nature, mountains', page, 10)
//     .then(response => {
//       console.log('Resonse', response);
//       return response.json();
//     })
//     .catch(err => {
//       console.log(err);
//     })
//     .then(json => {
//       json.results.forEach(image => {
//         console.log(image.urls.regular);
//         urlArray.push(image.urls.regular);
//       });
        
//       page--;
//       if (page === 0) {
//         return;
//       } else {
  
//         getPhotos(page);
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   console.log(urlArray.length);
// };

// getPhotos(10);

const photoUrlArray = [];

const getFakerPhotos = () => {

  while (photoUrlArray.length < 1000) {
    photoUrlArray.push(faker.image.imageUrl());
  }
};

getFakerPhotos();

  
const csvStream = csv.createWriteStream({headers: true});
const ws = fs.createWriteStream('database-postgresql/traildata.csv');

csvStream.pipe(ws);

// Place header into CSV file
csvStream.write(['trail_id', 'user_id', 'upload_date', 'photo_url', 'caption', 'is_hero_photo']);

let totalEntries = 10;

while (totalEntries > 0) {

  let userId = faker.random.number({'min': 1, 'max': 100});
  let uploadDate = faker.date.past().toISOString();
  let fakeCaption = faker.lorem.words();

  let photos = 10;

  while (photos > 0) {

    let newRow = [];
    let photo_id = totalEntries;
    let trail_id = totalEntries;
    let user_id = userId;
    let photo_url = photoUrlArray[Math.floor(Math.random() * photoUrlArray.length)];
    let upload_date = uploadDate;
    let caption = fakeCaption;
    let is_hero_photo = false;
  
    newRow = [photo_id, trail_id, user_id, upload_date, photo_url, caption, is_hero_photo];
  
    csvStream.write(newRow);

    photos--;

  }


  totalEntries--;
}
csvStream.end();

csvStream.on('end', () => {

  console.log('Completed writing to CSV file');

});