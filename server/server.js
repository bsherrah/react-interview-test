const express = require('express');
const server = require('./apollo');
const connectToDB = require('./db');
const seedDB = require('./dbSeeder');
const cors = require('cors');
const env = require('dotenv');
env.config();

const { SERVER_URL, CLIENT_URL, PORT } = process.env;

const app = express();

const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));

server.applyMiddleware({ app });

const run = async () => {
  await connectToDB();
  await seedDB();

  app.listen({ port: PORT }, () => {
    console.log(`Server running on ${SERVER_URL}:${PORT}${server.graphqlPath}`);
  });
};

run();
