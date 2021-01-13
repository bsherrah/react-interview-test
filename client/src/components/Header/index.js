import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';
import { useAppState } from '../../hooks';

import './styles.css';

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, user } = useAppState();

  const logout = () => {
    setIsLoggedIn(false);
    localStore.removeToken();
    history.push(ROUTES.login);
  };

  return (
    <div id="header">
      <span id="bonsai">Bonsai</span>
      {isLoggedIn && <Menu user={user} />}
    </div>
  );
};

const Menu = ({ user }) => {
  return (
    <div id="menu">
      <Link to={ROUTES.HOME}>Home</Link>
      <Link to={ROUTES.PRODUCTS}>Products</Link>
      <Link to={ROUTES.ORDERS}>Orders</Link>
      <Link to={ROUTES.CHECKOUT}>Checkout</Link>
      {user.cartItems && (
        <div className="cart-items-count">{user.cartItems.length}</div>
      )}

      {/* <img src={} style={{width:'59px', height: '60px'}}/> */}
    </div>
  );
};
export default Header;
