import React from 'react';

const DataProductLeftSlider = ({ children }) => {
  return (
    <div className="prodpage__images-wrapper">
      <div className="prodpage-swiper__gallery--vertical">{children}</div>
    </div>
  );
};

export default React.memo(DataProductLeftSlider);
