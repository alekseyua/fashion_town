import React from 'react';
import { GxSelect, GxInput, GxMenuItem } from '@garpix/garpix-web-components-react';
import style from '../index.module.scss';

const AddresFields = ({
  errors,
  counryOptions,
  footer_city,
  footer_country,
  footer_domofon,
  footer_street,
  footer_post_code,
  handleChange,
}) => {
  return (
    <div className={style['cabinet_myshop__contacts_wrapper']}>
      <div className={style['cabinet_myshop__contacts_header']}>адрес</div>
      <div className={style['cabinet_myshop__contacts_line']}></div>
      <GxSelect
        value={footer_country}
        name={'footer_country'}
        onGx-change={handleChange}
        label="Страна"
        className={style['cabinet_myshop__contacts_input']}
      >
        {counryOptions.map((el) => {
          return <GxMenuItem value={el.id}>{el.title}</GxMenuItem>;
        })}
      </GxSelect>
      <GxInput
        label="Название улицы, номер дома, корпус, строение, номер квартиры"
        type="text"
        onGx-change={handleChange}
        name={'footer_street'}
        value={footer_street}
        className={style['cabinet_myshop__contacts_input']}
      ></GxInput>
      {errors.footer_street ? <ErrorField message={errors.footer_street} /> : null}
      <GxInput
        label="Этаж, домофон и тд."
        type="text"
        onGx-change={handleChange}
        name={'footer_domofon'}
        value={footer_domofon}
        className={style['cabinet_myshop__contacts_input']}
      ></GxInput>
      {errors.footer_domofon ? <ErrorField message={errors.footer_domofon} /> : null}
      <GxInput
        label="Город, район"
        type="text"
        onGx-change={handleChange}
        name={'footer_city'}
        value={footer_city}
        className={style['cabinet_myshop__contacts_input']}
      ></GxInput>
      {errors.footer_city ? <ErrorField message={errors.footer_city} /> : null}
      <GxInput
        label="Почтовый индекс. Например, 104658"
        type="text"
        onGx-change={handleChange}
        name={'footer_post_code'}
        value={footer_post_code}
        className={style['cabinet_myshop__contacts_input']}
      ></GxInput>
      {errors.footer_post_code ? <ErrorField message={errors.footer_post_code} /> : null}
    </div>
  );
};

export default React.memo(AddresFields);
