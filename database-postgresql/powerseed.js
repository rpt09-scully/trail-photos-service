const fs = require('fs');
const csv = require('fast-csv');
const faker = require('faker');



// const data = [
//   ['trail_id', 'user_id', 'upload_date', 'photo_url', 'caption', 'is_hero_photo'],
// ];


const csvStream = csv.createWriteStream({headers: true});
const ws = fs.createWriteStream('database-postgresql/traildata.csv');

csvStream.pipe(ws);

// Place header into CSV file
csvStream.write(['trail_id', 'user_id', 'upload_date', 'photo_url', 'caption', 'is_hero_photo']);

let totalEntries = 100;

while (totalEntries > 0) {
  let newRow = [];
  let trail_id = totalEntries;
  let user_id = faker.random.number({'min': 1, 'max': 100});
  let photo_url = 'https://images.unsplash.com/photo-1499328610109-620357b0eed2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=700&h=520&fit=crop&ixid=eyJhcHBfaWQiOjF9';
  let upload_date = faker.date.past().toISOString();
  let caption = faker.lorem.words();
  let is_hero_photo = false;

  newRow = [trail_id, user_id, upload_date, photo_url, caption, is_hero_photo];

  csvStream.write(newRow);

  totalEntries--;
}
csvStream.end();

csvStream.on('end', () => {


  console.log('Done!');


});