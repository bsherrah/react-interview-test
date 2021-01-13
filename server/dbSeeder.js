const path = require('path');
const { Seeder } = require('mongo-seeding');

const { MONGODB_URI = 'mongodb://127.0.0.1:27017/test' } = process.env;

const seedDB = () => {
  const config = {
    database: MONGODB_URI,
    dropDatabase: true,
  };
  const collectionReadingOptions = {
    extensions: ['ts', 'js'],
  };
  const seeder = new Seeder(config);

  const mockCollections = seeder.readCollectionsFromPath(
    path.resolve(__dirname + '/data'),
    collectionReadingOptions
  );
  try {
    seeder.import(mockCollections);
    console.log('Successfully DB was seeded!');
  } catch (error) {
    console.log('Failed to seed DB: ', error);
  }
};

module.exports = seedDB;
