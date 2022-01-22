import React from 'react';
import Layout from '../Views';
import Product from '../components/Product';

const ProductPage = (props) => {
  const { header_menu, product } = props;
  return (
    <Layout {...props}>
      <Product product={product} size="detail" />
    </Layout>
  );
};

export default React.memo(ProductPage);
