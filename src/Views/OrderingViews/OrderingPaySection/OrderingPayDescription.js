import React from 'react';
import style from '../styles/index.module.scss';

const OrderingPayDescription = ({}) => {
  return (
    <p className={style['ordering__desc']}>
      Оплата производится в выбранной Вами валюте.
      <br />
      Стоимость товаров с момента оплаты фиксируется и не изменяется.
    </p>
  );
};

export default React.memo(OrderingPayDescription);
