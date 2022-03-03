import React from 'react';
import style from './styles/index.module.scss';

const WrapperCard = ({ children }) => {
  return <div className={style["wrapper_product"]}>{children}</div>;
};

export default React.memo(WrapperCard);
