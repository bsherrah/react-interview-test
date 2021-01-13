const updateCartItems = (cartItems, productId, qty) => {
  let productIdElement = cartItems.find((item) => item.productId === productId);
  if (!productIdElement) {
    return [...cartItems, { productId, qty }];
  }
  productIdElement.qty = productIdElement.qty + qty;

  return cartItems;
};

module.exports = {
  updateCartItems,
};
