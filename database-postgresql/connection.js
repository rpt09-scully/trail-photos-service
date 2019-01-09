const { Client } = require('pg');
require('dotenv').config();


let clientConfig = {
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.DBPORT,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD
};


let client = new Client(clientConfig);

client.connect();



module.exports = client;