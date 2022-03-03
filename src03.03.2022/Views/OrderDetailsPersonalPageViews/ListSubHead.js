import React from 'react';
import style from './styles/index.module.scss';

const ListSubHead = ({ title = '', count = '3' }) => {
  return (
    <div className={style['cabinet_orders_details__listsubhead']}>
      {title}
      <span className={style['cabinet_orders_details__listsubhead-red']}>{count}</span>
    </div>
  );
};

export default React.memo(ListSubHead);
