import React from 'react';
import { GxButton } from '@garpix/garpix-web-components-react';
import { Link } from 'react-router-dom';

const CartBigProduct = ({ product, removeFromCart, params } = {}) => {
  const {
    title,
    image,
    slug,
    price
  } = product;
  const {
    count
  } = params;
  return (
    <tr>
      <td className="product-thumbnail">
        <Link to={slug}><img className="small-img" src={image} alt="cart-image" /></Link>
      </td>
      <td className="product-name"><Link to={slug}>{title}</Link></td>
      <td className="product-price"><span className="amount">{price} ₽</span></td>
      <td className="product-quantity"><input type="number" defaultValue={1} /></td>
      <td className="product-subtotal">{Number(price) * Number(count)} ₽</td>
      <td className="product-remove">
        <GxButton variant="outline-dark" onClick={removeFromCart}></GxButton>
      </td>
    </tr>
  )
}

export default React.memo(CartBigProduct);
