import React from 'react';
import style from './styles/index.module.scss';

const TechnologiesBusiness = ({ children }) => {

  return <div className={style['about_page-background']}>{children}</div>;
};

export default React.memo(TechnologiesBusiness);
