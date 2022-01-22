import React from 'react';
import style from '../styles/index.module.scss';

const WrapForIcon = ({ children }) => {
  return (
    <div className={style['landing_create__img_block']}>{children}</div>
  );
};
export default React.memo(WrapForIcon);