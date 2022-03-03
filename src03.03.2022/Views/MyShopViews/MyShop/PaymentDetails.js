import React from 'react';
import style from '../index.module.scss';
import { GxButton, GxTextarea } from '@garpix/garpix-web-components-react';
import classNames from 'classnames';
import JoditField from '../../JoditField';
import Offset from '../../Offset';

const PaymentDetails = ({ values, handleSubmit, setFieldValue, handleChange }) => {
  return (
    <>
      {/* <GxTextarea
        value={values.requzites}
        onGx-change={handleChange}
        name={'requzites'}
        className={style['cabinet_myshop__section_input']}
      /> */}
      <JoditField
        placeholder="Введите текст"
        value={values.requzites}
        name={'requzites'}
        onBlurhandler={(newContent) => {
          setFieldValue('requzites', newContent);
        }}
      />
      <Offset offset={'content'} />
      <GxButton
        type={'submit'}
        onClick={handleSubmit}
        className={classNames({
          [style['cabinet_myshop__section_btn']]: true,
          [style['btn']]: true,
        })}
      >
        сохранить
      </GxButton>
    </>
  );
};

export default React.memo(PaymentDetails);
