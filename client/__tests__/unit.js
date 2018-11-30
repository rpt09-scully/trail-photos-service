const client = require('../../database-postgresql/connection');

describe('Database Content Tests', () => {
  const dbTeardown = () => {
    client.end();
  }

  afterAll(() => {
    dbTeardown();
  });

  const queryDB = (PSQLStatement, values, callback) => {
    client.query(PSQLStatement, values, (err, res) => {
      if(err) throw err;
      callback(res.rows);
    });
  }

  test('PostgreSQL database represents 100 or over 100 trail ids', done => {
    let countUniqueTrailIdsPSQLStatement = `SELECT COUNT (DISTINCT trail_id) from trailphotos`;
    queryDB(countUniqueTrailIdsPSQLStatement, null, result => {
      expect(Number(result[0].count)).toBeGreaterThanOrEqual(100);
      done();
    });
  });

  describe('PostgreSQL database has appropriate columns', () => {
    let columns;

    beforeAll(done => {
      let columnHeadersPSQLStatement = `SELECT * FROM information_schema.columns WHERE table_schema = $1 AND table_name = $2`;
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