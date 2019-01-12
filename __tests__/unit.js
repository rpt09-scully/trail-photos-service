const db = require('../database-postgresql/helpers');
let client = require('../database-postgresql/connection');
jest.mock('../database-postgresql/connection');

describe('Database Tests', () => {

  describe('Database Seed Tests', () => {
    jest.unmock('../database-postgresql/connection');
    let client = require.requireActual('../database-postgresql/connection');

    const dbTeardown = () => {
      client.end();
    };

    afterAll(() => {
      dbTeardown();
    });

    const queryDB = (PSQLStatement, values, callback) => {
      client.query(PSQLStatement, values, (err, res) => {
        if (err) { throw err; }
        callback(res.rows);
      });
    };

    test('PostgreSQL database represents 100 or over 100 trail ids', done => {
      let countUniqueTrailIdsPSQLStatement = 'SELECT COUNT (DISTINCT trail_id) from trailphotos';
      queryDB(countUniqueTrailIdsPSQLStatement, null, result => {
        expect(Number(result[0].count)).toBeGreaterThanOrEqual(100);
        done();
      });
    });

    describe('PostgreSQL database has appropriate columns', () => {

      let columns;

      beforeAll(done => {
        let columnHeadersPSQLStatement = 'SELECT * FROM information_schema.columns WHERE table_schema = $1 AND table_name = $2';
        queryDB(columnHeadersPSQLStatement, ['public', 'trailphotos'], result => {
          columns = result.map(item => {
            return item.column_name;
          });
          done();
        });
      });

      test('PostgreSQL database has 7 columns', () => {
        expect(columns.length).toBe(7);
      });

      test('PostgreSQL database has appropriate column headers', () => {
        expect(columns).toMatchSnapshot();
      });
    });
  });

  describe('Database Helpers Functional Tests', () => {
    let clientSpy; let dbHelperSpy; let expected;
    let mockTrailId = 3;

    beforeEach(() => {
      jest.restoreAllMocks();
      clientSpy = jest.spyOn(client, 'query');
    });


    test('/:trailId/photos DB Helper Functions Have Correct I/O', () => {
      dbHelperSpy = jest.spyOn(db, 'getPhotos');
      let mockSort = 'asc';

      expected = {
        'data': [
          {
            'attributes':
          {
            'caption': 'est aliquam ipsa',
            'is_hero_photo': true,
            'photo_url': 'https://loremflickr.com/cache/resized/4548_37476785314_096d5716ef_c_700_520_nofilter.jpg',
            'thumb_photo_url': 'https://loremflickr.com/cache/resized/4548_37476785314_096d5716ef_c_700_520_nofilter.jpg',
            'trail_id': '3',
            'upload_date': '2018-07-06T13:09:28.493Z',
            'user_id': '79'
          },
            'id': '8',
            'type':
            'trail-photos'
          },
          {
            'attributes':
          {
            'caption': 'autem corrupti corporis',
            'is_hero_photo': false,
            'photo_url': 'https://loremflickr.com/cache/resized/1789_41654679900_799c6df276_c_700_520_nofilter.jpg',
            'thumb_photo_url': 'https://loremflickr.com/cache/resized/1789_41654679900_799c6df276_c_700_520_nofilter.jpg',
            'trail_id': '3',
            'upload_date': '2018-07-30T13:02:49.706Z',
            'user_id': '60'
          },
            'id': '9',
            'type': 'trail-photos'
          }
        ]
      };

      db.getPhotos(mockTrailId, mockSort, (data) => {
        expect(data).toEqual(expected);
      });

      expect(dbHelperSpy).toHaveBeenCalled();
      expect(dbHelperSpy.mock.calls[0][0]).toBe(mockTrailId);
      expect(dbHelperSpy.mock.calls[0][1]).toBe(mockSort);

      expect(clientSpy).toHaveBeenCalled();
      expect(clientSpy.mock.calls[0][0]).toBe('SELECT * FROM trailphotos WHERE trail_id = $1ORDER BY upload_date asc');
      expect(clientSpy.mock.calls[0][1]).toEqual([mockTrailId]);
    });

    test('/:trailId/photosCount DB Helper Functions Have Correct I/O', () => {
      dbHelperSpy = jest.spyOn(db, 'getPhotosCount');

      expected = {
        'data':
          {
            'attributes':
            {
              'count': '5',
              'trail_id': '3'
            },
            'type': 'trail-photos-count'
          }
      };

      db.getPhotosCount(mockTrailId, (data) => {
        expect(data).toEqual(expected);
      });

      expect(dbHelperSpy).toHaveBeenCalled();
      expect(dbHelperSpy.mock.calls[0][0]).toBe(mockTrailId);

      expect(clientSpy).toHaveBeenCalled();
      expect(clientSpy.mock.calls[0][0]).toBe('SELECT COUNT(*) FROM trailphotos WHERE trail_id = $1');
      expect(clientSpy.mock.calls[0][1]).toEqual([mockTrailId]);
    });

    test('/:trailId/heroPhoto DB Helper Functions Have Correct I/O', () => {
      dbHelperSpy = jest.spyOn(db, 'getHeroPhoto');

      expected = {
        'data':
          {
            'attributes':
            {
              'caption': 'est aliquam ipsa',
              'is_hero_photo': true,
              'photo_url': 'https://loremflickr.com/cache/resized/4548_37476785314_096d5716ef_c_700_520_nofilter.jpg',
              'trail_id': '3',
              'upload_date': '2018-07-06T13:09:28.493Z',
              'user_id': '79'
            },
            'id': '8',
            'type':
              'trail-photos'
          }
      };

      db.getHeroPhoto(mockTrailId, (data) => {
        expect(data).toEqual(expected);
      });

      expect(dbHelperSpy).toHaveBeenCalled();
      expect(dbHelperSpy.mock.calls[0][0]).toBe(mockTrailId);

      expect(clientSpy).toHaveBeenCalled();
      expect(clientSpy.mock.calls[0][0]).toBe('SELECT * FROM trailphotos WHERE trail_id = $1 AND is_hero_photo = true');
      expect(clientSpy.mock.calls[0][1]).toEqual([mockTrailId]);
    });
  });

});