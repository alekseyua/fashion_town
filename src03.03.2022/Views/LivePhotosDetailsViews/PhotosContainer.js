import React from 'react';
import style from './styles/index.module.scss';

const PhotosContainer = ({ children }) => {
  return <div className={style['live_photos__wrapper']}>{children}</div>;
};
export default React.memo(PhotosContainer);
