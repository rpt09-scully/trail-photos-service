const sum = require('../sum.js');
const client = require('../../database-postgresql/connection');


const dbTeardown = () => {
  client.end();
}

afterEach(() => {
  dbTeardown();
});

const verify100PlusDbEntries = () => {
  var countUniqueTrailIdsPSQLStatement =
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});