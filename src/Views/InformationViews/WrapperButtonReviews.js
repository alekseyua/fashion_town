import React from 'react';
import style from './styles/index.module.scss'

const WrapperButtonReviews = ({ children }) => {
  return <div className={style["wrapper-buttons"]}>{children}</div>;
};

export default React.memo(WrapperButtonReviews);
