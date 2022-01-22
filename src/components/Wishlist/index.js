import React from 'react';
import { useStoreon } from 'storeon/react';
import Product from '../Product';

const Wishlist = () => {
  const { wishlist } = useStoreon('wishlist');

  return (
    <div className="cart-main-area p-5 pb-sm-5">
      <div className="container">
        <h2 className="text-capitalize sub-heading">Избранное</h2>
        <div className="row">
          <div className="col-md-12">
            {/* GxForm Start */}
            <form action="#">
              {/* Table Content Start */}
              <div className="table-content table-responsive mb-5">
                <table>
                  <thead>
                    <tr>
                      <th className="product-remove">Remove</th>
                      <th className="product-thumbnail">Image</th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Unit Price</th>
                      <th className="product-quantity">Stock Status</th>
                      <th className="product-subtotal">add to cart</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(wishlist).map((item) => {
                      let product = item.product;
                      return (<Product key={product.id} product={product} size={'wishlist'} />);
                    })}
                  </tbody>
                </table>
              </div>
              {/* GxRow End */}
            </form>
            {/* GxForm End */}
          </div>
        </div>
        {/* GxRow End */}
      </div>
    </div>
  )
};

export default React.memo(Wishlist);
