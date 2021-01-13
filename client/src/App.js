import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import client from './apollo/client';
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CheckoutPage from './pages/CheckoutPage';
import ProtectedRoute from './components/ProtectedRoute';
import { ROUTES } from './constants/routes';

import './styles.css';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Switch>
        <ProtectedRoute path={ROUTES.HOME} component={HomePage} />
        <ProtectedRoute path={ROUTES.PRODUCTS} component={ProductsPage} />
        <ProtectedRoute path={ROUTES.CHECKOUT} component={CheckoutPage} />
        <Route exact path={ROUTES.LOGIN} component={LoginPage} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
