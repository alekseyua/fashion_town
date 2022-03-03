import React from 'react';
import style from './styles/index.module.scss'

const WrapperEconomyDescription = ({ children }) => {

  return <div className={style["about_page_economy__left"]}>{children}</div>;
};

export default React.memo(WrapperEconomyDescription);

