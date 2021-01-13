const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const googleAuth = require('./googleAuth');

// #5 Initialize an Apollo server
const server = new ApolloServer({
  schema,
  context: async ({ req }) => await googleAuth(req),
});

module.exports = server;
