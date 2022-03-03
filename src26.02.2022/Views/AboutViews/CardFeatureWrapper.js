import React from 'react';
import style from './styles/index.module.scss';

const CardFeatureWrapper = ({ children }) => {

  //console.log(children)
  return <div className={style["about_page_pluses__wrapper"]}>{children}</div>;
};

export default React.memo(CardFeatureWrapper);
