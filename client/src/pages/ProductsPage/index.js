import React, { useState } from 'react';
import {
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardBody,
  Media,
} from 'reactstrap';
import { useQuery, useMutation } from '@apollo/client';

import { useAppState } from '../../hooks';
import Fetching from '../../components/Fetching';
import { ADD_TO_CART, LIKE_PRODUCT } from '../../apollo/operations/mutations';
import { GET_MERCHANTS } from '../../apollo/operations/queries';

import './styles.css';

function ProductsPage() {
  const { setProducts } = useAppState();
  const { loading, error, data } = useQuery(GET_MERCHANTS, {
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

  // if (error) return <Error />;

  if (loading || !data) return <Fetching />;

  return (
    <div className="page">
      <ProductsList merchants={data && data.merchants} />
    </div>
  );
}

const ProductsList = ({ merchants }) => {
  const productList = () => {
    if (merchants && merchants.length > 0) {
      return merchants.map(({ products }) => {
        return (
          products &&
          products.length > 0 &&
          products.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })
        );
      });
    }
  };

  return <div id="products-list-container">{productList()}</div>;
};

const ProductCard = ({ product }) => {
  const {
    id: productId,
    color,
    description,
    image,
    name,
    price,
    size,
  } = product;
  const [qty, setQty] = useState(1);
  const { setUser, user } = useAppState();

  const [addToCart] = useMutation(ADD_TO_CART, {
    onCompleted(data) {
      const {
        addToCart: { cartItems },
      } = data;
      setUser({
        ...user,
        cartItems,
      });
    },
  });

  const [likeProduct] = useMutation(LIKE_PRODUCT, {
    onCompleted(data) {
      const {
        likeProduct: { likedProducts },
      } = data;
      setUser({
        ...user,
        likedProducts,
      });
    },
  });

  const addToCartHandler = () => {
    addToCart({ variables: { productId, qty } });
  };

  const likeProductHandler = () => {
    if (!isProductLiked()) {
      likeProduct({ variables: { productId, liked: true } });
    } else {
      likeProduct({ variables: { productId, liked: false } });
    }
  };

  const changeQty = (type) => {
    const newQty = type === '+' ? qty + 1 : qty - 1;
    setQty(newQty);
  };

  const isProductLiked = () => {
    return !!user.likedProducts.find(
      (likedProductId) => productId === likedProductId
    );
  };

  return (
    <Media key={productId} className="product-card">
      <Media left href="#">
        <Media object src={image} alt="Product image cap" />
      </Media>
      <CardBody>
        <CardTitle style={{ fontWeight: 600 }}>{name}</CardTitle>
        <CardTitle>Price: ${price.toFixed(2)}</CardTitle>
        <CardSubtitle>Color: {color}</CardSubtitle>
        <CardSubtitle>Size: {size}</CardSubtitle>
        <CardText>Details: {description}</CardText>
        <div className="qty">
          <span>Qty</span>
          <div>
            <span onClick={() => changeQty('-')}>-</span>
            <input readOnly className="qty-input" value={qty} />
            <span onClick={() => changeQty('+')}>+</span>
          </div>
        </div>
        <div
          className={!isProductLiked() ? 'like' : 'like blue'}
          onClick={likeProductHandler}>
          {!isProductLiked() ? 'Like' : 'DISLIKE'}
        </div>
        <Button color="primary" size="lg" block onClick={addToCartHandler}>
          Add To Cart
        </Button>
      </CardBody>
    </Media>
  );
};

export default ProductsPage;
