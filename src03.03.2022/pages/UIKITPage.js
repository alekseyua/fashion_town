import React from 'react';
import Layout from '../Views';

const UIKITPage = (props) => {
  const { header_menu, product } = props;
  return <Layout {...props}>UIKITPage</Layout>;
};

export default React.memo(UIKITPage);
