import React from 'react';
import style from './styles/index.module.scss';

const DescriptionLeftBlock = ({ children }) => {

  //console.log(children)
  return <div className={style['about_page_reg__left']}>{children}</div>;
};

export default React.memo(DescriptionLeftBlock);
