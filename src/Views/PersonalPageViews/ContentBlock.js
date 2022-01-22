import React from 'react';
import style from './styles/wrapper.module.scss'

const ContentBlock = ({ children }) => {
  return <div className={style["cabinet-formblock__content"]}>{children}</div>;
};
export default React.memo(ContentBlock);
