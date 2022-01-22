import React from 'react';
import { GxButton } from '@garpix/garpix-web-components-react';
import { Link } from 'react-router-dom';

const CarProduct = ({ product, removeFromCart, params } = {}) => {
  const {
    title,
    image,
    slug,
    price,
  } = product;
  const {
    count
  } = params
  return (
    <div className="single-cart-box">
      <div className="cart-img">
        <Link to={slug}>
          <img className="small-img" src={image} alt="cart-image" />
        </Link>
      </div>
      <div className="cart-content">
        <h6><Link to={slug}>{title}</Link></h6>
        <span>{count} × {price} ₽</span>
      </div>
      <GxButton size="sm" variant="outline-dark" onClick={removeFromCart} className="del-icone">
       
      </GxButton>
    </div>
  )
}

export default React.memo(CarProduct);
