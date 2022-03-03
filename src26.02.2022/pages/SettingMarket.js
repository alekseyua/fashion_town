import React from 'react';
import Layout from '../Views';

const SettingMarket = (props) => {
  const { header_menu, product } = props;
  return <Layout {...props}>SettingMarket</Layout>;
};

export default React.memo(SettingMarket);
