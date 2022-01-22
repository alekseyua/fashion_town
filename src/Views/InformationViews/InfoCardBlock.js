import React from 'react';
import style from './styles/index.module.scss';

const InfoCardBlock = ({ children }) => {
  return <div className={style["wrapper-card_info"]}>{children}</div>;
};

export default React.memo(InfoCardBlock);
