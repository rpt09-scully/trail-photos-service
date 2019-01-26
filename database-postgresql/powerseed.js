const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const faker = require('faker');

const startTime = new Date();

const photoUrlArray = [];

const getFakerPhotos = () => {

  for (let i = 0; i <= 1000; i++) {
    photoUrlArray.push(faker.image.imageUrl(1000, i));
  }
};

getFakerPhotos();

const csvTrailPhotos = createCsvWriter({
  path: 'database-postgresql/trailphotos.csv',
  header: [
    {id: 'trail_id', title: 'trail_id'},
    {id: 'user_id', title: 'user_id'},
    {id: 'upload_date', title: 'upload_date'},
    {id: 'photo_url', title: 'photo_url'},
    {id: 'caption', title: 'caption'},
    {id: 'is_hero_photo', title: 'is_hero_photo'}
  ]
});

let totalEntries = 10000000;

// Stores 1000 records to be written to CSV file
const records = [];

const fillArray = async() => {

  while (totalEntries > 0) {

    let photosUrls = faker.random.number({
      'min': 3,
      'max': 5
    });
  
    while (photosUrls > 0) {
  
      if (photosUrls === 1) {
        hero = true;
      } else {
        hero = false;
      }
      
      records.push({
        trail_id: totalEntries, 
        user_id: faker.random.number({'min': 1, 'max': 100}),
        upload_date: faker.date.past().toISOString(),
        photo_url: photoUrlArray[Math.floor(Math.random() * photoUrlArray.length)],
        caption: faker.lorem.words(),
        is_hero_photo: hero
      });
    
      if (records.length === 1000) {
         
        await csvTrailPhotos.writeRecords(records);
    
        records.length = 0;
      }  
      photosUrls--;

    }
    totalEntries--;
  }

  let endTime = new Date();

  let completionTime = Math.abs(startTime - endTime);

  return completionTime;
};


fillArray()
  .then((result) =>{
    console.log(`Completed Writing to CSV in ${result / 1000 / 60} minutes`);
  });

