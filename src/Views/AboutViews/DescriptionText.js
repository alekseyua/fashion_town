import React from 'react';
import style from './styles/index.module.scss';

const DescriptionText = ({ children }) => {

  //console.log(children)
  return <div className={style['about_page_reg__desc']}>{children}</div>;
};

export default React.memo(DescriptionText);
