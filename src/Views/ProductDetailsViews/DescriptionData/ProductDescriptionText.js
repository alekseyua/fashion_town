import React from 'react';

const ProductDescriptionText = ({ content }) => {
  return (
    <div className="productdescription__text">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default React.memo(ProductDescriptionText);
