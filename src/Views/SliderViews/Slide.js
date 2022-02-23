import React from 'react';
import style from './styles/index.module.scss';

const Slide = ({ image }) => {
  return (
    <img
      loading={'eager'}
      src={image}
      width={'100%'}
      height={'100%'}
      className={style['image']}
      alt={'slide-img'}
    />
  );
};
export default React.memo(Slide);
