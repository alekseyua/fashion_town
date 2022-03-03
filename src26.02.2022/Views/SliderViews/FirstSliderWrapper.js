import React from 'react';
import style from './styles/index.module.scss';

const FirstSliderWrapper = ({ children }) => {
  return (
    <div className={style['wrapper__images-wrapper']}>
      <div className={style['wrapper-swiper__gallery--vertical']}>{children}</div>
    </div>
  );
};

export default React.memo(FirstSliderWrapper);
