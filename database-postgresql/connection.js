const { Client } = require('pg');
require('dotenv').config();

let client = new Client({
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.DBPORT,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD
});

client.connect()
  .catch(err => {
    throw new Error ('Database connection error during initial connection', err);
  });

client.on('error', (err) => {
  client.end()
    .then(() => {
      console.log('client has disconnected');
      throw new Error('Database connection error during active connection');
    });
});

process.on('unhandledRejection', reason => {
  console.error('Unhandled Rejection at:', reason, reason.stack);
  process.exit(1);
});

module.exports = client;