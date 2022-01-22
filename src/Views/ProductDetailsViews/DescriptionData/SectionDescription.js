import React from 'react';
import style from '../styles/index.module.scss';

const SectionDescription = ({ children }) => {
  return <section className={style['productdescription']}>{children}</section>;
};

export default React.memo(SectionDescription);
