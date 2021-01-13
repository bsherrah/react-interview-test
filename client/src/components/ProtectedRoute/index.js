import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppState } from '../../hooks';
import LoginPage from '../../pages/LoginPage';
import { ROUTES } from '../../constants/routes';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAppState();

  return (
    <div>
      <Route
        render={() =>
          isLoggedIn ? <Component /> : <Redirect to={ROUTES.LOGIN} />
        }
      />
    </div>
  );
};

export default ProtectedRoute;
