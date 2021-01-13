const Mongoose = require('mongoose');

const { MONGODB_URI = 'mongodb://127.0.0.1:27017/test' } = process.env;
Mongoose.Promise = global.Promise;

const connectToDB = async () => {
  try {
    console.log('Connecting to DB...');
    await Mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    Mongoose.set('useFindAndModify', false);
    console.log('Successfully connected to DB!');
  } catch (error) {
    console.log('Failed to connect to DB: ', error);
  }
};

module.exports = connectToDB;
