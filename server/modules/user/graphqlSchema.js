const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type cartItem {
    productId: String!
    qty: Int!
  }
  type order {
    orderId: String!
    products: [cartItem!]!
  }
  type User {
    name: String
    email: String
    picture: String
    likedProducts: [String!]!
    cartItems: [cartItem!]!
    orders: [order!]!
  }
  type Query {
    users: [User!]!
  }
  type Mutation {
    login: User!
    addToCart(productId: String!, qty: Int!): User!
    removeFromCart(productId: String!): User!
    resetCart: User!
    likeProduct(productId: String!, liked: Boolean!): User!
  }
`;

module.exports = typeDefs;
