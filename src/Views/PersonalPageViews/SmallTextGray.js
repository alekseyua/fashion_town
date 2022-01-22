import React from 'react';
import style from './styles/wrapper.module.scss'

const SmallTextGray = ({ children }) => {
  return <div className={style["cabinet-textsmall"]}>{children}</div>;
};
export default React.memo(SmallTextGray);
