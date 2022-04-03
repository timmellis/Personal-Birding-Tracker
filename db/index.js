const mongoose = require('mongoose');
 
/////   ↓↓ FOR LIVE DEPLOYMENT ↓↓   /////
require('dotenv').config();
let dbUrl = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://127.0.0.1:27017/birdtrackerDatabase'
/////   ↑↑ FOR LIVE DEPLOYMENT ↑↑   /////

mongoose
  .connect(dbUrl)
  .then(() => {
  console.log("<From: db/index.js> Boom! Connected to MongoDB!")
  })
  .catch((e) => {
    console.error('<From: db/index.js> Connection error: ', e.message);
  })
 
  mongoose.set('debug', true);
  const db = mongoose.connection;
 
module.exports = db;
