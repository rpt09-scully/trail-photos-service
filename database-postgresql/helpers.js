const client = require('./connection');

const getPhotos = (trailId, sortOrder, callback) => {
  const sortOrderStatement = sortOrder ? `ORDER BY upload_date ${sortOrder}` : '';

  const getPhotosPSQLStatement = 'SELECT * FROM trailphotos WHERE trail_id = $1' + sortOrderStatement;

  client.query(getPhotosPSQLStatement, [trailId], (err, res) => {
    if (err) {
      let myErr = new Error (err);
      myErr.query = getPhotosPSQLStatement;
      callback(myErr);
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
  });
};

const getPhotosCount = (trailId, callback) => {
  const getPhotosCountPSQLStatement = 'SELECT COUNT(*) FROM trailphotos WHERE trail_id = $1';

  client.query(getPhotosCountPSQLStatement, [trailId], (err, res) => {
    if (err) {
      let myErr = new Error (err);
      myErr.query = getPhotosPSQLStatement;
      callback(myErr);
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
      let myErr = new Error (err);
      myErr.query = getPhotosPSQLStatement;
      callback(myErr);
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