import React from 'react';
import style from '../styles/wrapper.module.scss';

const FormAlignRight = ({ children }) => {
  return <div className={style['form--alignright']}>{children}</div>;
};
export default React.memo(FormAlignRight);
