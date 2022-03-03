import React from 'react';
import style from './styles/index.module.scss'

const AboutFt = ({ children }) => {

  //console.log(children)
  return <div className={style["about_page_reg"]}>{children}</div>;
};

export default React.memo(AboutFt);
