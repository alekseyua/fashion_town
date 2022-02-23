import React from 'react';
import { Link } from 'react-router-dom';
import { GxRating } from '@garpix/garpix-web-components-react';
import Text from '../../components/Text';
import ProductPrice from '../../components/ProductPrice';
import WishlistButton from '../../components/WishlistButton';

const DefaultProduct = ({ product, addToCart, addToWishlist, removeFromWishlist } = {}) => {
  const { id, title, image, slug, price, old_price } = product;

  const handleAddToCart = () => {
    addToCart();
  };

  return (
    <div className="single-product">
      <div className="pro-img">
        <Link to={slug}>
          <img className="primary-img" src={image} alt="single-product" />
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
        <div className="pro-actions">
          <div className="actions-secondary">
            <WishlistButton
              productId={id}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
            />
            <button type="button" onClick={handleAddToCart} className="add-cart">
              <Text text={'add_to_cart'} />
            </button>
            <Link to="compare.html" data-toggle="tooltip" title="Add to Compare"></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DefaultProduct);
