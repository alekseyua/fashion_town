import React from 'react';
import style from './error.module.scss';

const Error = ({ message }) => {
  return <div className={style['error']}>{message}</div>;
};

export default React.memo(Error);
