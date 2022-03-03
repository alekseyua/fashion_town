import React from 'react';
import ImageBanners from './ImageBanners';
import BrandBanners from './BrandBanners';

const config = {
  'image': ImageBanners,
  'brand': BrandBanners,
}

const Banners = ({ mode="image", ...props }) => {
  if(config[mode]) {
    const Component = config[mode];
    return <Component {...props} />;
  }
  return null
}

export default React.memo(Banners);