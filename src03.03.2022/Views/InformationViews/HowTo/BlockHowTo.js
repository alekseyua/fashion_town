import React from 'react';
import style from '../styles/index.module.scss';

const BlockHowTo = ({ children }) => {
  return <div className={style['information-howto__wrapper']}>{children}</div>;
};
export default React.memo(BlockHowTo);
