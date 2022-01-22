import React from 'react';
import { GxSelect, GxMenuItem } from '@garpix/garpix-web-components-react';
import style from '../styles/style.module.scss';

const FilterOrders = ({ filters, onStatusChange, statusValue }) => {
  return (
    <GxSelect
      onGx-change={onStatusChange}
      className={style['cabinet-clients__select']}
      placeholder="Все заказы"
      value={statusValue}
    >
      {filters?.length > 0 &&
        filters.map(({ title, value }) => (
          <GxMenuItem key={value} className={style['cabinet_market__status_item']} value={value}>
            {title}
          </GxMenuItem>
        ))}
    </GxSelect>
  );
};

export default React.memo(FilterOrders);
