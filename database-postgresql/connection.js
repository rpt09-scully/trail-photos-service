const { Client } = require('pg');
require('dotenv').config()

const client = new Client({
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.DBPORT,
})

client.connect();

module.exports = client;