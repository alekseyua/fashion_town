import React from 'react';
import { GxSelect, GxInput, GxMenuItem } from '@garpix/garpix-web-components-react';
import style from '../index.module.scss';

const AddresFieldsContacts = ({
  errors,
  counryOptions,
  contacts_city,
  contacts_country,
  contacts_domofon,
  contacts_street,
  contacts_post_code,
  handleChange,
}) => {
  return (
    <div className={style['cabinet_myshop__contacts_wrapper']}>
      <div className={style['cabinet_myshop__contacts_header']}>адрес</div>
      <div className={style['cabinet_myshop__contacts_line']}></div>
      <GxSelect
        value={contacts_country}
        name={'contacts_country'}
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
        name={'contacts_street'}
        value={contacts_street}
        className={style['cabinet_myshop__contacts_input']}
      ></GxInput>
      {errors.contacts_street ? <ErrorField message={errors.contacts_street} /> : null}
      <GxInput
        label="Этаж, домофон и тд."
        type="text"
        onGx-change={handleChange}
        name={'contacts_domofon'}
        value={contacts_domofon}
        className={style['cabinet_myshop__contacts_input']}
      ></GxInput>
      {errors.contacts_domofon ? <ErrorField message={errors.contacts_domofon} /> : null}
      <GxInput
        label="Город, район"
        type="text"
        onGx-change={handleChange}
        name={'contacts_city'}
        value={contacts_city}
        className={style['cabinet_myshop__contacts_input']}
      ></GxInput>
      {errors.contacts_city ? <ErrorField message={errors.contacts_city} /> : null}
      <GxInput
        label="Почтовый индекс. Например, 104658"
        type="text"
        onGx-change={handleChange}
        name={'contacts_post_code'}
        value={contacts_post_code}
        className={style['cabinet_myshop__contacts_input']}
      ></GxInput>
      {errors.contacts_post_code ? <ErrorField message={errors.contacts_post_code} /> : null}
    </div>
  );
};

export default React.memo(AddresFieldsContacts);
