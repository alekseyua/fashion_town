import React from 'react';
import Layout from '../Views';

const RequisitesMarket = (props) => {
  const { header_menu, product } = props;
  return <Layout {...props}>RequisitesMarket</Layout>;
};

export default React.memo(RequisitesMarket);
