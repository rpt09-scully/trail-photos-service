const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.DBPORT,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD
});

client.connect();

module.exports = client;