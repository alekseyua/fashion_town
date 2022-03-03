import React from 'react';
import { Link } from 'react-router-dom';
import { GxCol, GxRow, GxRating } from '@garpix/garpix-web-components-react';
import ProductPrice from '../../components/ProductPrice';
import Text from '../../components/Text';

const RowSmallProduct = ({ product, addToCart } = {}) => {
  const { title, image, slug, price, old_price } = product;

  const handleAddToCart = () => {
  
    addToCart();
  };

  return (
    <GxRow>
      <GxCol>
        <Link to={slug}>
          <img className="small-img" src={image} alt="product-image" />
        </Link>
      </GxCol>
      <GxCol>
        <Link to={slug}>{title}</Link>
        <GxRating name="rate1" starCount={5} value={5} />
      </GxCol>
      <GxCol>
        <ProductPrice price={price} oldPrice={old_price} />
      </GxCol>
      <GxCol>
        <button type="button" onClick={handleAddToCart} className="add-cart">
          <Text text={'add_to_cart'} />
        </button>
      </GxCol>
    </GxRow>
  );
};

export default React.memo(RowSmallProduct);
