import React from 'react';
import DefaultProduct from './DefaultProduct';
import SmallProduct from './SmallProduct';
import CarProduct from './CartProduct';
import CartBigProduct from './CartBigProduct';
import CatalogProduct from './CatalogProduct';
import DetailProduct from './DetailProduct';
import WishlistProduct from './WishlistProduct';
import RowSmallProduct from './RowSmallProduct';


const sizesConfig = {
  'small': SmallProduct,
  'cart': CarProduct,
  'cart-big': CartBigProduct,
  'catalog': CatalogProduct,
  'detail': DetailProduct,
  'wishlist': WishlistProduct,
  'row-small': RowSmallProduct,
}

const Product = ({ size, ...props }) => {
  const product = props;
  if(!product) return null;
  
  if(sizesConfig[size]) {
    const Component = sizesConfig[size]
    return <Component {...props} />
  }
  return <DefaultProduct {...props} />
}

export {Product};
