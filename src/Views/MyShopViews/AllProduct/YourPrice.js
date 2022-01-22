import React from 'react';
import style from '../index.module.scss';
import { GxInput } from '@garpix/garpix-web-components-react';

const YourPrice = ({ value, handleChange }) => {
  return (
    <div className={style['cabinet_market__card_price_wrap']}>
      <p className={style['cabinet_market__card_price_head']}>Ваша цена:</p>
      <GxInput
        value={value}
        onGx-change={handleChange}
        className={style['cabinet_market__card_input']}
      ></GxInput>
    </div>
  );
};

export default React.memo(YourPrice);
