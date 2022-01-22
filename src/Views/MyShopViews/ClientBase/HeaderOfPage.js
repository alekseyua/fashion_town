import React from 'react';
import style from '../index.module.scss';

const HeaderOfPage = ({ header }) => {
  return <h1 className={style['cabinet-heading']}>{header}</h1>;
};

export default React.memo(HeaderOfPage);
