import { InMemoryCache, makeVar } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        appState: {
          read() {
            return stateVar();
          },
        },
      },
    },
  },
});

const appStateInitialValue = {
  isLoggedIn: false,
  products: [],
  user: {},
};

export const appStateVar = makeVar(appStateInitialValue);
