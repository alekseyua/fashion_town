import React from 'react';
import { GxInput, GxPhoneInput } from '@garpix/garpix-web-components-react';
import ErrorField from '../../ErrorField';
import PhoneField from '../../PhoneField';
import Text from '../../../components/Text';
import style from '../index.module.scss';

const PhoneAndEmail = ({ errors, footer_phone, footer_email, handleChange, setFieldValue }) => {
  return (
    <div className={style['cabinet_myshop__contacts_wrapper']}>
      <div className={style['cabinet_myshop__contacts_header']}>телефон /электронная почта</div>
      <div className={style['cabinet_myshop__contacts_line']}></div>
      <PhoneField
        variant={'varian-input_small'}
        labelVariant={'label-input_small'}
        value={footer_phone}
        name={'phone'}
        placeholder="+7 (   )"
        label={'Телефон'}
        onGx-change={(e) => {
          setFieldValue('footer_phone', e.detail.formattedValue);
        }}
      />
      {errors.footer_phone ? <ErrorField message={errors.footer_phone} /> : null}
      <GxInput
        label="Электронная почта"
        type="email"
        onGx-change={handleChange}
        name={'footer_email'}
        value={footer_email}
        placeholder="Email"
        className={style['cabinet_myshop__contacts_input']}
      ></GxInput>
      {errors.footer_email ? <ErrorField message={errors.footer_email} /> : null}
    </div>
  );
};

export default React.memo(PhoneAndEmail);
