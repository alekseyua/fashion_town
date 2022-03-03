import React from 'react';
import style from './styles/index.module.scss';

const TextUnderTitle = ({ children, variant }) => {
  return <div className={style[variant]}>{children}</div>;
};

export default React.memo(TextUnderTitle);
