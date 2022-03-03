import React from 'react';
import Layout from '../Views';
import Product from '../components/Product';
import Modal from '../Views/ModalCreator';


const ProductPage = (props) => {
  const { header_menu, product } = props;
  return (
    <Layout {...props}>
      <Modal.StorControllerModal />
      <Product product={product} size="detail" />
    </Layout>
  );
};

export default React.memo(ProductPage);
