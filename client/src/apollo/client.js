import { ApolloClient, HttpLink, ApolloLink, concat } from '@apollo/client';
import { cache } from './cache';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const httpLink = new HttpLink({ uri: REACT_APP_API_URL });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || null,
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
});

export default client;
