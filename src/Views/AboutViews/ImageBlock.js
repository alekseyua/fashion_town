import React from 'react';
import style from './styles/index.module.scss';

const ImageBlock = ({ image, className }) => {

  //console.log(image)
  return <img src={image} className={style[className]} />;
};
export default React.memo(ImageBlock);
