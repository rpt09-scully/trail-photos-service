const { Client } = require('pg');
require('dotenv').config();

let clientConfig = {
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.DBPORT,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD
};

let clientGen = () => new Client(clientConfig);
let client;

let invokeConnection = (fn) => {
  client = clientGen();
  client.connect()
    .then(() => {
      console.log('connected');
      fn();
    })
    .catch( e => {
      var endPromise = new Promise(function(resolve, reject) {
        console.log('In endPromise');
        client.end(err => {
          console.log('client has disconnected');
          resolve();
          if (err) {
            console.log('error during disconnection');
          }
        });
      });
      endPromise.then(() => {
        console.log('CURRENT TIME OF ERROR', new Date());
        console.error('connection error', e.stack);
        setTimeout(() => {
          invokeConnection(fn);
        }, 45000);
      });
    });
};

var getPhotos = (trailId, sortOrder, callback) => {
  invokeConnection(getPhotosWork.bind(null, trailId, sortOrder, callback));
};

var getPhotosWork = (trailId, sortOrder, callback) => {
  const sortOrderStatement = sortOrder ? `ORDER BY upload_date ${sortOrder}` : '';
  const getPhotosPSQLStatement = 'SELECT * FROM trailphotos WHERE trail_id = $1' + sortOrderStatement;

  client.query(getPhotosPSQLStatement, [trailId], (err, res) => {

    if (err) {
      console.log('Error with getPhotos DB Request - timestamp:', new Date());
      // throw err;
    }
    let result = {
      data: res.rows.map(item => {
        let resultItem = {};
        let {photo_id, photo_url, trail_id, user_id, upload_date, caption, is_hero_photo} = item;
        trail_id = trail_id.toString();
        user_id = user_id.toString();
        resultItem.attributes = {photo_url, trail_id, user_id, upload_date, caption, is_hero_photo};
        resultItem.type = 'trail-photos';
        resultItem.id = photo_id.toString();
        return resultItem;
      })
    };
    callback(result);
    client.end();
  });
};

const getPhotosCount = (trailId, callback) => {
  const getPhotosCountPSQLStatement = 'SELECT COUNT(*) FROM trailphotos WHERE trail_id = $1';
  client.query(getPhotosCountPSQLStatement, [trailId], (err, res) => {
    if (err) {
      console.log('Error with getPhotosCount DB Request - timestamp:', new Date());
      // throw err;
    }
    let result = {
      data: {
        type: 'trail-photos-count',
        attributes: {
          trail_id: trailId.toString(),
          count: res.rows[0].count
        }
      }
    };
    callback(result);
  });
};

const getHeroPhoto = (trailId, callback) => {
  const getHeroPhotoPSQLStatement = 'SELECT * FROM trailphotos WHERE trail_id = $1 AND is_hero_photo = true';
  client.query(getHeroPhotoPSQLStatement, [trailId], (err, res) => {
    if (err) {
      console.log('Error with getHeroPhoto DB Request - timestamp:', new Date());
      throw err;
    }
    let {photo_id, photo_url, trail_id, user_id, upload_date, caption, is_hero_photo} = res.rows[0];
    trail_id = trail_id.toString();
    user_id = user_id.toString();
    let result = {
      data: {
        type: 'trail-photos',
        id: photo_id.toString(),
        attributes: {photo_url, trail_id, user_id, upload_date, caption, is_hero_photo}
      }
    };
    callback(result);
  });
};

module.exports = {
  getPhotos,
  getPhotosCount,
  getHeroPhoto
};