import React from 'react';
import style from './styles/index.module.scss';

const FormBlock = ({ children }) => {
  return <div className={style['form-block']}>{children}</div>;
};
export default React.memo(FormBlock);
