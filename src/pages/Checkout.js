import React from 'react';

import Layout from '../Views';

import Checkout from '../components/Checkout';

const CheckoutPage = (props) => {
  return (
    <Layout {...props}>
      <Checkout />
    </Layout>
  );
};

export default React.memo(CheckoutPage);
