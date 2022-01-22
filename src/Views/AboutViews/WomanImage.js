import React from 'react';
import style from './styles/index.module.scss';

const WomanImage = ({ image }) => {

  return (
    <div className={style['about_page_reg__img_wrap']}>
      <img src={image} className={style['about_page_reg__img']} />
    </div>
  );
};

export default React.memo(WomanImage);
