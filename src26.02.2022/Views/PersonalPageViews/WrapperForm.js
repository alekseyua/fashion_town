import React from 'react';
import style from './styles/wrapper.module.scss';

const WrapperForm = ({ children }) => {
  return <div className={style['cabinet-formblock']}>{children}</div>;
};
export default React.memo(WrapperForm);
