const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASS;

const mongoose = require('mongoose');
const dbRoute = `mongodb://admin:123eyesonme@ds143326.mlab.com:43326/sama_app`;

mongoose.connect(
  dbRoute,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

mongoose.Promise = global.Promise;

module.exports = mongoose.connection;
