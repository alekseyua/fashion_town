import React from 'react';
import style from './error.module.scss'

const ErrorField = ({ message }) => {
  return <div className={style["error"]} slot="help-text">{message}</div>;
};

export default React.memo(ErrorField);
