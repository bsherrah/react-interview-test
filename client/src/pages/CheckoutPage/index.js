import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';

import { useAppState } from '../../hooks';
import Fetching from '../../components/Fetching';
import { GET_MERCHANTS } from '../../apollo/operations/queries';
import { Button } from 'reactstrap';
import {
  RESET_CART,
  REMOVE_FROM_CART,
} from '../../apollo/operations/mutations';

import './styles.css';

const CheckoutPage = () => {
  const [isCartCheckedOut, setIsCartCheckedOut] = useState(false);
  const { user, setUser, products, setProducts } = useAppState();

  const [getMerchants, { loading }] = useLazyQuery(GET_MERCHANTS, {
    onCompleted(data) {
      let products = [];
      if (data && data.merchants) {
        data.merchants.forEach((merchant) => {
          merchant.products.forEach((product) => {
            products = [product, ...products];
          });
        });
      }
      setProducts(products);
    },
  });

  const [resetCart] = useMutation(RESET_CART, {
    onCompleted(data) {
      const {
        resetCart: { cartItems },
      } = data;
      setUser({
        ...user,
        cartItems,
      });
      setIsCartCheckedOut(true);
    },
  });

  const buy = () => {
    resetCart();
  };

  useEffect(() => {
    if (products.length === 0) {
      getMerchants();
    }
  }, []);

  if (loading) return <Fetching />;

  return (
    <div className="page">
      <div className="checkout-container">
        <h2>Items in cart: </h2>
        {isCartCheckedOut && <p> Order confirmed, it's on the way...</p>}
        {!isCartCheckedOut && <CheckOutItems products={products} user={user} />}
        {user.cartItems && (
          <Button color="primary" size="lg" block onClick={buy}>
            Buy
          </Button>
        )}
      </div>
    </div>
  );
};

const CheckOutItems = ({ products, user }) => {
  const { cartItems } = user;
  const { setUser } = useAppState();

  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    onCompleted(data) {
      console.log('compieted');
      const {
        removeFromCart: { cartItems },
      } = data;
      setUser({
        ...user,
        cartItems,
      });
    },
  });

  if (cartItems.length === 0)
    return <p id="no-items-in-cart">No items in the cart!</p>;

  return (
    products &&
    cartItems &&
    cartItems.map((item) => {
      const product = products.find((product) => product.id === item.productId);
      if (product) {
        const { image, name, price } = product;
        return (
          <div key={item.productId} className="checkout-item">
            <span
              className="remove-item"
              onClick={() =>
                removeFromCart({ variables: { productId: item.productId } })
              }>
              X
            </span>
            <img className="image-small" src={image} />
            <div>
              <p>Name: {name}</p>
              <p>Price: {(price * item.qty).toFixed(2)}</p>
            </div>
          </div>
        );
      }
    })
  );
};

export default CheckoutPage;
