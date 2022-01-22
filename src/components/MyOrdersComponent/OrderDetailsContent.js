import React from 'react';

const OrderDetailsContent = ({ children }) => {
  return <div>{children}</div>;
};

export default React.memo(OrderDetailsContent);
