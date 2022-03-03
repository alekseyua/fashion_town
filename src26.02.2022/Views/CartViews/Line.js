import React from 'react';
import style from './styles/index.module.scss';

const Line = () => {
  return <div className={style['line']}></div>;
};

export default React.memo(Line);
