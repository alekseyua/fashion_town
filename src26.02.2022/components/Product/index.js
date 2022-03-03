import React from 'react';
import { useStoreon } from 'storeon/react';
import {Product as ProductLayout} from '../../Views/Product';

const Product = ({ product, size }) => {
  const { dispatch, cart } = useStoreon('cart');

  const addToCart = (params = {count: 1}) => {
    dispatch('cart/update', {
      product,
      params
    });
  }

  const removeFromCart = () => {
    dispatch('cart/remove', {
      id: product.id
    });
  }

  const addToWishlist = (params = {}) => {
    dispatch('wishlist/update', {
      product,
      params
    });
  }

  const removeFromWishlist = () => {
    dispatch('wishlist/remove', {
      id: product.id
    });
  }

  const params = cart[product.id] ? cart[product.id].params : undefined;

  return (
    <ProductLayout
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      addToWishlist={addToWishlist}
      removeFromWishlist={removeFromWishlist}
      product={product}
      params={params}
      size={size}
    />
  )
}

export default React.memo(Product);
