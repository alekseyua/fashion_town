import React from 'react';
import style from './styles/index.module.scss'

const HelpText = ({ children }) => {
  return <p className={style["help-text"]}>{children}</p>;
};

export default React.memo(HelpText);
