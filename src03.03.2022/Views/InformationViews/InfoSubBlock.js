import React from 'react';
import style from './styles/index.module.scss';

const InfoSubBlock = ({ children }) => {
  return <div className={style["wrapper-subcontent"]}>{children}</div>;
};

export default React.memo(InfoSubBlock);
