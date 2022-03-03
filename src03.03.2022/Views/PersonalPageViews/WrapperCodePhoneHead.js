import React from 'react';
import style from './styles/wrapper.module.scss';

const WrapperCodePhoneHead = ({ children }) => {
  return <div className={style["wrapper_change_phone"]}>{children}</div>;
};

export default React.memo(WrapperCodePhoneHead);
