import React from 'react';
import style from '../styles/wrapper.module.scss';

const FormColl = ({ children }) => {
  return <div className={style['cabinet-form__col']}>{children}</div>;
};
export default React.memo(FormColl);
