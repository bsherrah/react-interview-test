const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const merchant = new Schema({
  index: { type: Number },
  guid: { type: String },
  logo: { type: String },
  dateCreated: { type: String },
  publishedState: { type: Boolean },
  brands: [{ type: String }],
  products: [
    {
      belongsToBrand: { type: Number },
      id: { type: String },
      name: { type: String },
      price: { type: Number },
      description: { type: String },
      color: { type: String },
      size: { type: String },
      quantity: { type: Number },
      image: { type: String },
    },
  ],
  merchant: { type: String },
  commissionFee: { type: String },
  contactEmail: { type: String },
  phone: { type: String },
  address: { type: String },
  publishedDate: { type: String },
  publishedBy: {
    userId: { type: String },
  },
  companyDescription: { type: String },
});

module.exports = mongoose.model('Merchant', merchant);
