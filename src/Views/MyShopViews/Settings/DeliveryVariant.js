import React from 'react';
import { GxInput } from '@garpix/garpix-web-components-react';
import style from '../index.module.scss';

const DeliveryVariant = ({ title, handleChange, nameTitle, namePrice, valueTitle, valuePrice }) => {
  return (
    <div className={style['cabinet_myshop__contacts_wrapper']}>
      <div className={style['cabinet_myshop__contacts_header']}>{title}</div>
      <div className={style['cabinet_myshop__contacts_line']}></div>

      <div className={style['cabinet_myshop__contacts_flex']}>
        <GxInput
          label="Название"
          type="text"
          name={nameTitle}
          value={valueTitle}
          onGx-change={handleChange}
          className={style['cabinet_myshop__contacts_input-half']}
        ></GxInput>
        <GxInput
          label="Стоимость"
          type="text"
          type="number"
          name={namePrice}
          onGx-change={handleChange}
          value={valuePrice}
          className={style['cabinet_myshop__contacts_input-half']}
        ></GxInput>
      </div>
    </div>
  );
};

export default React.memo(DeliveryVariant);
