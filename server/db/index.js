const mongoose = require('mongoose');
 
///////// FOR LIVE DEPLOYMENT /////////////////
require('dotenv').config();
 
let dbUrl = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://127.0.0.1:27017/birdtrackerDatabase'
          // WHEN TIME FOR LIVE DEPLOYMENT, REPLACE BELOW: 
          // .connect(dbUrl)

mongoose
  .connect('mongodb://127.0.0.1:27017/birdtrackerDatabase')
  .then(() => {
  console.log("<File: db/index.js> Boom! Connected to MongoDB!")
  })
  .catch((e) => {
    console.error('<File: db/index.js> Walk before you run... Connection error: ', e.message);
  })
 
  mongoose.set('debug', true);
  const db = mongoose.connection;
 
module.exports = db;
