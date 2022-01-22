import React from 'react';
import { GxButton } from '@garpix/garpix-web-components-react';
import classNames from 'classnames';
import style from '../styles/index.module.scss';

const OrderingPayButtons = ({ payment_methods = [], setActiveVariantPayments }) => {
  if (payment_methods.length) {
    return (
      <div className={style['ordering__button_wrap']}>
        {payment_methods.map((el) => {
          return (
            <GxButton
              variant="text"
              key={el.id}
              id={el.id}
              onClick={setActiveVariantPayments}
              className={classNames({
                [style['ordering__button']]: true,
                [style['ordering__button-active']]: el.active,
              })}
            >
              {el.title}
            </GxButton>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default React.memo(OrderingPayButtons);
