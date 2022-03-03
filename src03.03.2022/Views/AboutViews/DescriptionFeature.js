import React from 'react';
import style from './styles/index.module.scss';

const DescriptionFeature = ({ children }) => {
  //console.log(children)
  return <div className={style['about_page_pluses__desc']}>{children}</div>;
};
export default React.memo(DescriptionFeature);
