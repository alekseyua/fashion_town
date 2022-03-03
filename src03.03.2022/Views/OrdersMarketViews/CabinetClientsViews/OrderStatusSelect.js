import { GxSelect, GxMenuItem } from '@garpix/garpix-web-components-react';
import React from 'react';
import style from '../styles/style.module.scss';

const OrderStatusSelect = ({ statuses, currentStatus, onOrderStatusChange }) => {
  return (
    <GxSelect
      size="sm"
      placeholder="Статус заказа: выбрать"
      className={style['cabinet_market__status']}
      onGx-change={onOrderStatusChange}
      value={currentStatus}
    >
      {statuses?.length > 0 &&
        statuses.map(({ title, status }) => (
          <GxMenuItem key={status} className={style['cabinet_market__status_item']} value={status}>
            {title}
          </GxMenuItem>
        ))}
    </GxSelect>
  );
};

export default React.memo(OrderStatusSelect);
