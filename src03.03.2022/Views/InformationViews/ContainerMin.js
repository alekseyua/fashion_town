import React from 'react';
import style from './styles/index.module.scss';

const ContainerMin = ({ children }) => {
  return <section className={style['information-exchange']}>{children}</section>;
};
export default React.memo(ContainerMin);
