import React from 'react';
import PhoneField from '../../PhoneField';
import { GxInput } from '@garpix/garpix-web-components-react';
import Text from '../../../components/Text';
import style from '../index.module.scss';

const NameAndEmail = ({
  errors,
  handleChange,
  setFieldValue,
  contacts_title,
  contacts_phone,
  contacts_email,
}) => {
  return (
    <div className={style['cabinet_myshop__contacts_wrapper']}>
      <div className={style['cabinet_myshop__contacts_header']}>
        Название магазина/ телефон /электронная почта
      </div>
      <div className={style['cabinet_myshop__contacts_line']}></div>
      <GxInput
        label="Название магазина"
        type="text"
        value={contacts_title}
        name={"contacts_title"}
        onGx-change={handleChange}
        className={style['cabinet_myshop__contacts_input']}
      ></GxInput>
      {errors.contacts_title ? <ErrorField message={errors.contacts_title} /> : null}
      <PhoneField
        variant={'varian-input_small'}
        labelVariant={'label-input_small'}
        value={contacts_phone}
        name={'contacts_phone'}
        placeholder="+7 (   )"
        autocomplete={'off'}
        label={Text({ text: 'mobPhone' })}
        onGx-change={(e) => {
          setFieldValue('phone', e.detail.formattedValue);
        }}
      />
      {errors.contacts_phone ? <ErrorField message={errors.contacts_phone} /> : null}
      <GxInput
        label="Электронная почта"
        type="email"
        placeholder="Email"
        name={"contacts_email"}
        value={contacts_email}
        onGx-change={handleChange}
        className={style['cabinet_myshop__contacts_input']}
      ></GxInput>
      {errors.contacts_email ? <ErrorField message={errors.contacts_email} /> : null}
    </div>
  );
};

export default React.memo(NameAndEmail);
