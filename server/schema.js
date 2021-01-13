const { mergeSchemas } = require('apollo-server-express');

const merchantTypeDefs = require('./modules/merchant/graphqlSchema');
const merchantResolvers = require('./modules/merchant/resolvers');

const userTypeDefs = require('./modules/user/graphqlSchema');
const userResolvers = require('./modules/user/resolvers');

const schema = mergeSchemas({
  schemas: [merchantTypeDefs, userTypeDefs],
  resolvers: [merchantResolvers, userResolvers],
});

module.exports = schema;
