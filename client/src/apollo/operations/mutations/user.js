import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation {
    login {
      name
      email
      picture
      likedProducts
      cartItems {
        productId
        qty
      }
    }
  }
`;

export const RESET_CART = gql`
  mutation {
    resetCart {
      cartItems {
        productId
        qty
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: String!, $qty: Int!) {
    addToCart(productId: $productId, qty: $qty) {
      cartItems {
        productId
        qty
      }
    }
  }
`;

export const LIKE_PRODUCT = gql`
  mutation LikeProduct($productId: String!, $liked: Boolean!) {
    likeProduct(productId: $productId, liked: $liked) {
      likedProducts
    }
  }
`;
