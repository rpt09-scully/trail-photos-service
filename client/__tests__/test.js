const sum = require('../sum.js');
const client = require('../../database-postgresql/connection');


const dbTeardown = () => {
  client.end();
}

afterEach(() => {
  dbTeardown();
});

const verify100PlusDbEntries = (callback) => {
  var countUniqueTrailIdsPSQLStatement = `SELECT COUNT (DISTINCT trail_id) from trailphotos`;
  client.query(countUniqueTrailIdsPSQLStatement, (err, res) => {
    if(err) throw err;
    callback(Number(res.rows[0].count));
  });
}

test('PostgreSQL database represents over 100 trail ids', done => {
  verify100PlusDbEntries(result => {
    expect(result).toBeGreaterThanOrEqual(100);
    done();
  });
});