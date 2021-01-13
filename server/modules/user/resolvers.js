const User = require('../../models/UserModel');
const { updateCartItems } = require('./helper');

const resolvers = {
  Query: {
    users: () => User.find(),
  },
  Mutation: {
    login: async (_, __, { payload: { name, email, picture } }) => {
      const user = await User.findOne({ email });
      if (!user) {
        const newUser = new User({
          name,
          email,
          picture,
        });
        return await newUser.save();
      }
      const updatedUser = User.findOneAndUpdate(
        { email },
        { $set: { name, picture } },
        { new: true }
      );
      return updatedUser;
    },

    addToCart: async (_, { productId, qty }, { payload: { email } }) => {
      const user = await User.findOne({ email });
      const cartItems = user.cartItems;
      const newCartItems = updateCartItems(cartItems, productId, qty);
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $set: { cartItems: newCartItems } },
        { new: true }
      );
      return updatedUser;
    },

    removeFromCart: async (_, { productId }, { payload: { email } }) => {
      console.log('to remove: id: ', productId, ' email: ', email);
      const user = await User.findOne({ email });
      const cartItems = user.cartItems;
      const newCartItems = cartItems.filter(
        (item) => item.productId !== productId
      );
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $set: { cartItems: newCartItems } },
        { new: true }
      );
      return updatedUser;
    },

    resetCart: async (_, __, { payload: { email } }) => {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $set: { cartItems: [] } },
        { new: true }
      );
      return updatedUser;
    },

    likeProduct: async (_, { productId, liked }, { payload: { email } }) => {
      const updatedUser = liked
        ? await User.findOneAndUpdate(
            { email },
            { $addToSet: { likedProducts: productId } },
            { new: true }
          )
        : await User.findOneAndUpdate(
            { email },
            { $pull: { likedProducts: productId } },
            { new: true }
          );
      return updatedUser;
    },
  },
};

module.exports = resolvers;
