
const client = require('./connection.js');

const getPhotos = (trailId, sortOrder, callback) => {
  let sortOrderStatement = sortOrder ? `ORDER BY upload_date ${sortOrder}` : '';

  let getPhotosPSQLStatement = `SELECT * FROM trailphotos WHERE trail_id = $1` + sortOrderStatement;

  client.query(getPhotosPSQLStatement, [trailId], (err, res) => {
    if(err) throw err;
    let result = {
      data: res.rows.map(item => {
        let resultItem = {};
        let {photo_id, photo_url, trail_id, user_id, upload_date, caption, is_hero_photo} = item;
        resultItem.attributes = {photo_url, trail_id, user_id, upload_date, caption, is_hero_photo}
        resultItem.type = 'trail-photos';
        resultItem.id = photo_id;
        return resultItem;
      })
    }
    callback(result);
  });
};

const getPhotosCount = (trailId, callback) => {
  let getPhotosCountPSQLStatement = `SELECT COUNT(*) FROM trailphotos WHERE trail_id = $1`;
  client.query(getPhotosCountPSQLStatement, [trailId], (err, res) => {
    if(err) throw err;
    let result = {
      data: {
        type: 'trail-photos-count',
        attributes: {
          trail_id: trailId,
          count: res.rows[0].count
        }
      }
    }
    callback(result);
  })
};

const getHeroPhoto = (trailId, callback) => {
  let getHeroPhotoPSQLStatement = `SELECT * FROM trailphotos WHERE trail_id = $1 AND is_hero_photo = true`;
  client.query(getHeroPhotoPSQLStatement, [trailId], (err, res) => {
    if(err) throw err;
    let {photo_id, photo_url, trail_id, user_id, upload_date, caption, is_hero_photo} = res.rows[0];
    let result = {
      data: {
        type: 'trail-photos',
        id: photo_id,
        attributes: {photo_url, trail_id, user_id, upload_date, caption, is_hero_photo}
      }
    }
    callback(result);
  });
}

module.exports = {
  getPhotos,
  getPhotosCount,
  getHeroPhoto
}