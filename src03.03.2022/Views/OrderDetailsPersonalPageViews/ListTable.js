import React from 'react';
import classNames from 'classnames';
import { GxButton, GxIcon } from '@garpix/garpix-web-components-react';
import { btnDown } from '../../images';
import style from './styles/index.module.scss';

const ListTable = ({ specification, count }) => {
  return (
    <div className={style['cabinet_orders_details__listhead']}>
      <div className={style['cabinet_orders_details__listtitle']}>Товаров в заказе ({count})</div>

      <GxButton
        variant="text"
        download
        href={specification}
        size="sm"
        className={classNames({
          [style['linkblue']]: true,
          [style['cabinet_orders_details__listlink']]: true,
        })}
      >
        <GxIcon slot="icon-left" src={btnDown} />
        Скачать спецификацию
      </GxButton>
    </div>
  );
};
export default React.memo(ListTable);
