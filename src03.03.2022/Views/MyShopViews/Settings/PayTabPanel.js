import React from 'react';
import { GxTextarea, GxButton } from '@garpix/garpix-web-components-react';
import JoditField from '../../JoditField';
import style from '../index.module.scss';
import Offset from '../../Offset';

const PayTabPanel = ({
  info_payment,
  info_payment_photo,
  handleChange,
  setFieldValue,
  getAboutPhoto,
}) => {
  return (
    <div className={style['cabinet_myshop__tab_wrapper']}>
      {/* <GxTextarea
        label="Варианты оплаты"
        placeholder="Введите текст"
        value={info_payment}
        name={'info_payment'}
        onGx-change={handleChange}
        className={style['cabinet_myshop__tab_textarea']}
      /> */}
      <JoditField
        label="Варианты оплаты"
        placeholder="Введите текст"
        value={info_payment}
        name={'info_payment'}
        onBlurhandler={(newContent) => {
          setFieldValue('info_payment', newContent);
        }}
      />
      <Offset offset={'content'} />
      <div className={style['cabinet_myshop__tab_upload_wrapper']}>
        <div className={style['cabinet_myshop__tab_upload_wrapper']}>
          <input
            className={style['cabinet_myshop__tab_upload_text']}
            onChange={(e) => {
              const files = e.currentTarget.files;
              setFieldValue('info_payment_photo', files[0]);
            }}
            type="file"
          />
          {info_payment_photo ? (
            <div>На данный момент: {getAboutPhoto(info_payment_photo)}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PayTabPanel);
