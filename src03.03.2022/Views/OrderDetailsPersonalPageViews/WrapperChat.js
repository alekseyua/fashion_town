import React from 'react';
import style from './styles/index.module.scss';

const WrapperChat = ({ children }) => {
  return <div className={style["cabinet_orders_details__chat"]}>{children}</div>;
};

export default React.memo(WrapperChat);
