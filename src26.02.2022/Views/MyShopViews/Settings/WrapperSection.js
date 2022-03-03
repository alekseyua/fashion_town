import React from 'react';
import style from '../index.module.scss';

const WrapperSection = ({ children }) => {
  return <section className={style['cabinet_myshop__section']}>{children}</section>;
};

export default React.memo(WrapperSection);
