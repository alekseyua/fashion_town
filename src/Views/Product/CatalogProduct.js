import React from 'react';
import { Link } from 'react-router-dom';
import Text from '../../components/Text';
import { GxRating } from '@garpix/garpix-web-components-react';
import ProductPrice from '../../components/ProductPrice';
import WishlistButton from '../../components/WishlistButton';

const CatalogProduct = ({ product, addToCart, addToWishlist, removeFromWishlist } = {}) => {
  const { id, title, image, slug, price, old_price, content } = product;

  const handleAddToCart = () => {
    addToCart();
  };


  return (
    <div className="single-product single-product--catalog">
      {/* Product Image Start */}
      <div className="pro-img">
        <Link to={slug}>
          <img className="primary-img" src={image} alt="single-product" />
        </Link>
      </div>
      {/* Product Image End */}
      {/* Product Content Start */}
      <div className="pro-content">
        <div className="product-rating">
          <GxRating name="rate1" starCount={5} value={5} />
        </div>
        <h4>
          <Link to={slug}>{title}</Link>
        </h4>
        <ProductPrice price={price} oldPrice={old_price} />
        <div dangerouslySetInnerHTML={{ __html: content }} />
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
      {/* Product Content End */}
    </div>
  );
};

export default React.memo(CatalogProduct);
