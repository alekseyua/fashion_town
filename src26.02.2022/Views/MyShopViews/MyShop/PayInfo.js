import React from 'react';
import style from '../index.module.scss';
import { GxButton } from '@garpix/garpix-web-components-react';

const PayInfo = ({ expiration_date, handleClick }) => {
  return (
    <div className={style['cabinet_myshop__section_btn_wrapper']}>
      <div className={style['cabinet_myshop__section_pay']}>
        Оплачен до:{' '}
        <span className={style['cabinet_myshop__section_pay-bold']}>{expiration_date}</span>
      </div>
      <GxButton
        onClick={handleClick}
        variant="text"
        size="sm"
        className={style['cabinet_myshop__section_paybtn']}
      >
        Оплатить
      </GxButton>
    </div>
  );
};

export default React.memo(PayInfo);
