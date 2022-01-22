import React from 'react';

const DataProductLeftSlider = ({ children }) => {
  return <div className="prodpage-swiper__gallery">{children}</div>;
};

export default React.memo(DataProductLeftSlider);
