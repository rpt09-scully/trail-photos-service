var client = {
  query: (PSQLStatement, [trailId], callback) => {
    var mockReturnValue = {
      rows: [
        {
          photo_url: 'https://loremflickr.com/cache/resized/4548_37476785314_096d5716ef_c_700_520_nofilter.jpg',
          trail_id: 3,
          user_id: 79,
          upload_date: '2018-07-06T13:09:28.493Z',
          caption: 'est aliquam ipsa',
          is_hero_photo: true,
          photo_id: 8
        },
        {
          photo_url: 'https://loremflickr.com/cache/resized/1789_41654679900_799c6df276_c_700_520_nofilter.jpg',
          trail_id: 3,
          user_id: 60,
          upload_date: '2018-07-30T13:02:49.706Z',
          caption: 'autem corrupti corporis',
          is_hero_photo: false,
          photo_id: 9
        }
      ]
    };
    var getPhotosCountPSQLStatement = 'SELECT COUNT(*) FROM trailphotos WHERE trail_id = $1';
    var getHeroPhotosPSQLStatement = 'SELECT * FROM trailphotos WHERE trail_id = $1 AND is_hero_photo = true';
    if (PSQLStatement === getPhotosCountPSQLStatement) {
      mockReturnValue = {rows: [{count: '5'}]};
    } else if (PSQLStatement === getHeroPhotosPSQLStatement) {
      mockReturnValue = {
        rows: [mockReturnValue.rows[0]]
      };
    }
    callback(null, mockReturnValue);
  }
};

module.exports = client;