import React from 'react';
import style from './styles/error.module.scss';

const ErrorBlock = ({ helpText }) => {
  return <div className={style['wrapper']}>{helpText}</div>;
};

export default React.memo(ErrorBlock);
