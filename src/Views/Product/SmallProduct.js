import React from 'react';
import { Link } from 'react-router-dom';
import { GxRating } from '@garpix/garpix-web-components-react';
import ProductPrice from '../../components/ProductPrice';

const SmallProduct = ({ product } = {}) => {
  const { title, image, slug, price, old_price } = product;

  return (
    <div className="single-product">
      <div className="pro-img">
        <Link to={slug}>
          <img className="small-img" src={image} alt="product-image" />
        </Link>
      </div>
      <div className="pro-content">
        <div className="product-rating">
          <GxRating name="rate1" starCount={5} value={5} />
        </div>
        <h4>
          <Link to={slug}>{title}</Link>
        </h4>
        <ProductPrice price={price} oldPrice={old_price} />
      </div>
    </div>
  );
};

export default React.memo(SmallProduct);
