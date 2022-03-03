import React from 'react';
import style from './styles/index.module.scss';

const HeadChat = ({}) => {
  return (
    <div className={style['cabinet_orders_details__chat_head']}>
      Чат по заказу
      <div className={style['cabinet_orders_details__chat_mobbtn']}>&#9660;</div>
    </div>
  );
};

export default React.memo(HeadChat);
