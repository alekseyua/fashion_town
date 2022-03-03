import React from 'react';
import style from './heplText.module.scss';

const HelpTextAndLine = ({ children }) => {
  return <div className={style['wrapper']}>{children}</div>;
};
export default React.memo(HelpTextAndLine);
