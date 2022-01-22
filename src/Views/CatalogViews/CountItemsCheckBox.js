import React from 'react';
import style from './styles/index.module.scss';
const CountItemsCheckBox = ({ children }) => {
  return <div className={style['catfilter-item__count']}>{children}</div>;
};

export default React.memo(CountItemsCheckBox);
