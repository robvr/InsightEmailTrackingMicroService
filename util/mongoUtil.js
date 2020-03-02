const mongoose = require('mongoose');
const config = require('../config/config');

let _db;

module.exports = {
  connectToServer: (callback) => {
    mongoose.connect(config.database.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set('useFindAndModify', false);
    _db = mongoose.connection;
    _db.on('error', () => {
      console.log('> error occurred from the database');
    });
    _db.on('open', () => {
      console.log('> successfully opened the database');
      callback();
    });
  },
  getDb: () => {
    return _db;
  }
};
