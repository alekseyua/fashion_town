import React from 'react';
import style from './styles/index.module.scss';

const ChatFieldsWrapper = ({ children }) => {
  return <div className={style['cabinet_orders_details__chat_field']}>{children}</div>;
};

export default React.memo(ChatFieldsWrapper);
