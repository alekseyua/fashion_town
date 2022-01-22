import React from 'react';
import style from '../styles/index.module.scss';

const Container = ({ children }) => {
  return (
    <div className={style['landing_create__wrapper']}>{children}</div>
  );
};
export default React.memo(Container);