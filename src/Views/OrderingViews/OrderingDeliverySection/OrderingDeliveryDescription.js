import React from 'react';
import style from '../styles/index.module.scss';

const OrderingDeliveryDescription = ({}) => {
  return (
    <p className={style["ordering__desc"]}>
      {/* Описание для розницы, для дропа и опта в макете тот же текст, но по идее должен быть другой */}
      Для розничного покупателя: <br />
      РФ, Украина, Беларусь: 300 р., от 2-х ед. - бесплатно.
      <br />
      Казахстан: 800 р., от 3-х ед. - бесплатно
    </p>
  );
};

export default React.memo(OrderingDeliveryDescription);
