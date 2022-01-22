import React from 'react';
import classNames from 'classnames';
import CheckBox from '../../Views/CheckBox';
import style from './styles/index.module.scss';

const Item = ({
  isRead,
  date = '16 дек, 14:15',
  message = 'Проверка соблюдения условий',
  checked,
}) => {
  return (
    <div className={style['cabinet_notifications__item']}>
      <div className={style['cabinet_notifications__item_wrapper']}>
        <CheckBox
          onGx-change={(e) => {
            const value = e.target.checked;
            // if (value !== null && values.selected !== value)
            //   updateProductFromCart({
            //     id: id,
            //     selected: value,
            //     qty: values.qty,
            //   });
          }}
          variant="input"
          checked={checked}
        />
        <span
          className={classNames({
            [style['cabinet_notifications__item_mark']]: true,
            [style['cabinet_notifications__item_mark-unread']]: !isRead,
          })}
        ></span>
        <span
          className={classNames({
            [style['cabinet_notifications__item_header']]: true,
            [style['cabinet_notifications__item_header-unread']]: !isRead,
          })}
        >
          {message}
        </span>
      </div>
      <span className={style['cabinet_notifications__item_date']}>{date}</span>
    </div>
  );
};

export default React.memo(Item);
