import React from 'react';
import style from './styles/index.module.scss';

const SpinnerWrapper = ({ children }) => {
  return <div className={style["spinner__wrapper"]}>{children}</div>;
};

export default React.memo(SpinnerWrapper);
