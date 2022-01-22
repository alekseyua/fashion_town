import React from 'react';
import { GxButton } from '@garpix/garpix-web-components-react';
import classNames from 'classnames';
import style from '../styles/index.module.scss';

const OrderingDeliveryHeadForm = ({ waitForCall, setFieldValue, delivery_condition }) => {
  return (
    <div className={style['ordering_delivery__form_top']}>
      <div dangerouslySetInnerHTML={{ __html: delivery_condition }}></div>
      <GxButton
        onClick={() => {
          setFieldValue('waitForCall', !waitForCall);
        }}
        className={classNames({
          [style['ordering_delivery__form_btn']]: true,
          [style['ordering_delivery__form_btn-active']]: waitForCall,
        })}
      >
        дождаться звонка
      </GxButton>
    </div>
  );
};
export default React.memo(OrderingDeliveryHeadForm);
