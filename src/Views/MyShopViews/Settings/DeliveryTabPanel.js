import React from 'react';
import { GxTextarea } from '@garpix/garpix-web-components-react';
import JoditField from '../../JoditField';
import style from '../index.module.scss';
import Offset from '../../Offset';

const DeliveryTabPanel = ({
  info_delivery,
  info_delivery_photo,
  handleChange,
  setFieldValue,
  getAboutPhoto,
}) => {
  return (
    <div className={style['cabinet_myshop__tab_wrapper']}>
      {/* <GxTextarea
        label="Варианты доставки"
        value={info_delivery}
        name={'info_delivery'}
        onGx-change={handleChange}
        placeholder="Введите текст"
        className={style['cabinet_myshop__tab_textarea']}
      /> */}
      <JoditField
        label="Варианты доставки"
        placeholder="Введите текст"
        value={info_delivery}
        name={'info_delivery'}
        onBlurhandler={(newContent) => {
          setFieldValue('info_delivery', newContent);
        }}
      />
      <Offset offset={"content"}/>
      <div className={style['cabinet_myshop__tab_upload_wrapper']}>
        <input
          className={style['cabinet_myshop__tab_upload_text']}
          onChange={(e) => {
            const files = e.currentTarget.files;
            setFieldValue('info_delivery_photo', files[0]);
          }}
          type="file"
        />
        {info_delivery_photo ? (
          <div>На данный момент: {getAboutPhoto(info_delivery_photo)}</div>
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(DeliveryTabPanel);
