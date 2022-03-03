import React from 'react';
import style from '../styles/wrapper.module.scss';

const FormRow = ({ children }) => {
  return <div className={style['cabinet-form__row']}>{children}</div>;
};
export default React.memo(FormRow);
