import React from 'react';
import style from './styles/index.module.scss';

const LayoutCheckBoxItem = ({ children }) => {
  return <div className={style['catfilter-item']}>{children}</div>;
};

export default React.memo(LayoutCheckBoxItem);
