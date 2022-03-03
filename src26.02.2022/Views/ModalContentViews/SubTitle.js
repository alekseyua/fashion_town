import React from 'react';
import style from './styles/index.module.scss';

const SubTitle = ({ children }) => {
  return <h4 className={style["sub_title"]}>{children}</h4>;
};

export default React.memo(SubTitle);
