import React from 'react';
import style from '../styles/index.module.scss';

const BrandName = ({ name = 'BRAND' }) => {
  return <p className={style['prodpage__namebrand']}>{name}</p>;
};

export default React.memo(BrandName);
