import React from 'react';
import LivePhotosLayout from '../../Views/LivePhotosLayout';

const LivePhotos = ({ live_photos = [], live_photos_url }) => {
  return <LivePhotosLayout live_photos={live_photos} live_photos_url={live_photos_url} />;
};
export default React.memo(LivePhotos);
