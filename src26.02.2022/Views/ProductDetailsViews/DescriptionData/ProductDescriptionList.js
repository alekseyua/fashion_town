import React from 'react';

const ProductDescriptionList = ({ extra }) => {
  return <div className="productdescription__text" dangerouslySetInnerHTML={{ __html: extra }} />;
};

export default React.memo(ProductDescriptionList);
