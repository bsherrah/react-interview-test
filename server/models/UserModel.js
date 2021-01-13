const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  picture: { type: String },
  likedProducts: { type: [String] },
  cartItems: [
    {
      productId: { type: String },
      qty: { type: Number },
    },
  ],
  orders: [
    {
      orderId: String,
      products: [
        {
          productId: { type: String },
          qty: { type: Number },
        },
      ],
    },
  ],
});

module.exports = mongoose.model('User', user);
