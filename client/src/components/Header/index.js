import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';
import { useAppState } from '../../hooks';
import { localStore } from '../../utils';

import './styles.css';

const Header = () => {
  const { isLoggedIn, user } = useAppState();

  return (
    <div id="header">
      <span id="bonsai">Bonsai</span>
      {isLoggedIn && <Menu />}
    </div>
  );
};

const Menu = () => {
  const { setIsLoggedIn, user } = useAppState();

  const logout = () => {
    setIsLoggedIn(false);
    localStore.removeToken();
    history.push(ROUTES.LOGIN);
  };

  return (
    <>
      <div id="menu">
        <Link to={ROUTES.HOME}>Home</Link>
        <Link to={ROUTES.PRODUCTS}>Products</Link>
        <Link to={ROUTES.CHECKOUT}>Checkout</Link>
        {user.cartItems && (
          <div className="cart-items-count">{user.cartItems.length}</div>
        )}

        {/* <img src={} style={{width:'59px', height: '60px'}}/> */}
      </div>
      <button id="logout" onClick={logout}>
        Logout
      </button>
    </>
  );
};
export default Header;
