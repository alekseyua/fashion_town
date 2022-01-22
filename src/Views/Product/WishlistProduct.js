import React from 'react';
import { GxButton } from '@garpix/garpix-web-components-react';
import { Link } from 'react-router-dom';
import Text from "../../components/Text";

const WishlistProduct = ({ product, addToCart } = {}) => {
  const handleAddToCart = () => {
    debugger;
    console.log('**************************************handleAddToCart*****************************************');
    addToCart();
  };

  return (
      <tr key={product.id}>
          <td className="product-remove"><Link to={product.slug}></Link>
          </td>
          <td className="product-thumbnail">
              <Link to={product.slug}><img className={'small-img'} src={product.image} alt="Изображение товара" /></Link>
          </td>
          <td className="product-name"><Link to={product.slug}>{product.title}</Link></td>
          <td className="product-price"><span className="amount">{product.price} ₽</span></td>
          <td className="product-stock-status"><span>{product.stock}</span></td>
          <td className="product-add-to-cart"><button type="button" onClick={handleAddToCart} className="add-cart"><Text text={'add_to_cart'}/></button></td>
      </tr>
  )
}

export default React.memo(WishlistProduct);
