import React from 'react';
import style from '../styles/index.module.scss';

const WrapForStep = ({ children }) => {
  return (
    <ul className={style['landing_create__list']}>{children}</ul>
  );
};
export default React.memo(WrapForStep);