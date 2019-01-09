const { Client } = require('pg');
require('dotenv').config();


var client;

var connectDB = () => {
  client = new Client({
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: process.env.DBPORT,
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD
  });

  // client.on('error', (err) => {
  //   debugger;
  //   console.error('something bad happened');
  // });

  // client.on('end', (err) => {
  //   debugger;
  //   console.error('something bad happened');
  // })

  client.connect()
    .then(() => {
      console.log('connected');
    })
    .catch( e => {

      var endPromise = new Promise(function(resolve, reject) {
        console.log('In endPromise');
        client.end(err => {
          console.log('client has disconnected');
          resolve();
          if (err) {
            console.log('error during disconnection');
          }
        });
      });
      endPromise.then(() => {
        debugger;
        console.log('CURRENT TIME OF ERROR', new Date());
        console.error('connection error', e.stack);
        setTimeout(() => {
          connectDB();
        }, 5000);
      });
    });
};

connectDB();


module.exports = {
  client,
  connectDB
};