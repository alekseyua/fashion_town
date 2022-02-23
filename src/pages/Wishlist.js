import React from 'react';
import Layout from '../Views';
import Wishlist from '../components/Wishlist';
import Modal from '../Views/ModalCreator';


const WishlistPage = (props) => {
  return (
    <Layout {...props}>
      <Modal.StorControllerModal />
      <Wishlist />
    </Layout>
  );
};

export default React.memo(WishlistPage);
