const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.DBPORT,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD
});


function connectDB () {
  client.connect()
    .then(() => {
      console.log('connected');
    })
    .catch( e => {
      var endPromise = new Promise(function(resolve, reject) {
        client.end(err => {
          console.log('client has disconnected');
          resolve();
          if (err) {
            console.log('error during disconnection');
          }
        });
      });
      endPromise.then(() => {
        console.log('CURRENT TIME OF ERROR', new Date());
        console.error('connection error', e.stack);
        connectDB();
      });
    });
}

connectDB();



module.exports = client;