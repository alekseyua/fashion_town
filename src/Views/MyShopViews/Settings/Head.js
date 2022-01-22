import React from 'react';
import style from '../index.module.scss';

const Head = ({ children }) => {
  return <div className={style['cabinet_myshop__section_head']}>{children}</div>;
};

export default React.memo(Head);
