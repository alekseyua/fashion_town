import React from 'react';
import style from './styles/index.module.scss';

const Text = ({ type, children }) => {
  return <span className={style[type]}>{children}</span>;
};

export default React.memo(Text);
