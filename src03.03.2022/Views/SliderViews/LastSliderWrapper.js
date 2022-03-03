import React from 'react';
import style from './styles/index.module.scss';

const LastSliderWrapper = ({ children }) => {
  return <div className={style["wrapper-swiper__gallery"]}>{children}</div>;
};

export default React.memo(LastSliderWrapper);
