import React from 'react';
import style from './styles/formSignIn.module.scss';

const GroupBlock = ({ children }) => {
  return <div className={style['wrapper__form__group-btn']}>{children}</div>;
};

export default React.memo(GroupBlock);