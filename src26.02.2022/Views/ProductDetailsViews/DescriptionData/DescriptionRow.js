import React from 'react';

const DescriptionRow = ({ children }) => {
  return <div className="productdescription__row">{children}</div>;
};

export default React.memo(DescriptionRow);
