import React from 'react';
import { GxButton } from '@garpix/garpix-web-components-react';
import classNames from 'classnames';
import style from '../styles/index.module.scss';

const OrderingDeliveryVariantsBtn = ({ deliveryVariant = [], setActiveVariantPayments }) => {
  return (
    <>
      <div className={style['ordering__button_wrap']}>
        {deliveryVariant.map((el) => {
          return (
            <GxButton
              key={el.id}
              id={el.id}
              onClick={setActiveVariantPayments}
              variant="text"
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
    </>
  );
};

export default React.memo(OrderingDeliveryVariantsBtn);
