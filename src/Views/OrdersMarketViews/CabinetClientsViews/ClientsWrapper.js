import React from 'react';
import style from '../styles/style.module.scss';

const ClientsWrapper = ({ children }) => {
  return <div className={style['cabinet-clients__wrapper']}>{children}</div>;
};

export default React.memo(ClientsWrapper);
