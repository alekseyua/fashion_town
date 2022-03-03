import React from 'react';
import { GxTextarea, GxButton } from '@garpix/garpix-web-components-react';
import JoditField from '../../JoditField';
import style from '../index.module.scss';
import Offset from '../../Offset';

const ChangeTabPanel = ({
  info_exchange,
  info_exchange_photo,
  handleChange,
  setFieldValue,
  getAboutPhoto,
}) => {
  return (
    <div className={style['cabinet_myshop__tab_wrapper']}>
      {/* <GxTextarea
        label="Варианты обмена и возврата"
        placeholder="Введите текст"
        value={info_exchange}
        name={'info_exchange'}
        onGx-change={handleChange}
        className={style['cabinet_myshop__tab_textarea']}
      /> */}
      <JoditField
        label="Варианты обмена и возврата"
        placeholder="Введите текст"
        value={info_exchange}
        name={'info_exchange'}
        onBlurhandler={(newContent) => {
          setFieldValue('info_exchange', newContent);
        }}
      />
      <Offset offset={'content'} />
      <div className={style['cabinet_myshop__tab_upload_wrapper']}>
        <input
          className={style['cabinet_myshop__tab_upload_text']}
          onChange={(e) => {
            const files = e.currentTarget.files;
            setFieldValue('info_exchange_photo', files[0]);
          }}
          type="file"
        />
        {info_exchange_photo ? (
          <div>На данный момент: {getAboutPhoto(info_exchange_photo)}</div>
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(ChangeTabPanel);
