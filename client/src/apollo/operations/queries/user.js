import { gql } from '@apollo/client';

export const LOGIN = gql`
  {
    login {
      name
      email
      picture
      likedProducts
    }
  }
`;
