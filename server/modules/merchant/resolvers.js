const Merchant = require('../../models/MerchantModel');

const resolvers = {
  Query: {
    merchants: () => Merchant.find(),
  },
};

module.exports = resolvers;
