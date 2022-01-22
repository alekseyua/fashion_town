import React from 'react';
import { GxTextarea, GxButton } from '@garpix/garpix-web-components-react';
import JoditField from '../../JoditField';
import Offset from '../../Offset';
import style from '../index.module.scss';

const InfoTabPanel = ({
  info_juridical,
  info_juridical_photo,
  handleChange,
  setFieldValue,
  getAboutPhoto,
}) => {
  return (
    <div className={style['cabinet_myshop__tab_wrapper']}>
      {/* <GxTextarea
        label="Юридическая информация"
        placeholder="Введите текст"
        value={info_juridical}
        name={'info_juridical'}
        onGx-change={handleChange}
        className={style['cabinet_myshop__tab_textarea']}
      /> */}
      <JoditField
        label="Юридическая информация"
        placeholder="Введите текст"
        value={info_juridical}
        name={'info_juridical'}
        onBlurhandler={(newContent) => {
          setFieldValue('info_juridical', newContent);
        }}
      />
      <Offset offset={'content'} />
      <div className={style['cabinet_myshop__tab_upload_wrapper']}>
        <input
          className={style['cabinet_myshop__tab_upload_text']}
          onChange={(e) => {
            const files = e.currentTarget.files;
            setFieldValue('info_juridical_photo', files[0]);
          }}
          type="file"
        />
        {info_juridical_photo ? (
          <div>На данный момент: {getAboutPhoto(info_juridical_photo)}</div>
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(InfoTabPanel);
