import React from 'react';
import Layout from '../Views';
import Wishlist from '../components/Wishlist';

const WishlistPage = (props) => {
  return (
    <Layout {...props}>
      <Wishlist />
    </Layout>
  );
};

export default React.memo(WishlistPage);
