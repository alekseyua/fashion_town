import React from 'react';
import style from './styles/index.module.scss';

const EconomyImage = ({ image }) => {

  //console.log(children)
  return (
    <div className={style['about_page_economy__right']}>
      <img src={image} className={style['about_page_economy__img']} />
    </div>
  );
};

export default React.memo(EconomyImage);
