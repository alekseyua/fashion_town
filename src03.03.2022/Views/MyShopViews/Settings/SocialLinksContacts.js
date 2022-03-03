import React from 'react';
import { GxInput, GxIcon, GxTextarea } from '@garpix/garpix-web-components-react';
import { fbIcon, igIcon, vkIcon } from '../../../images';
import JoditField from '../../JoditField';
import style from '../index.module.scss';
import Offset from '../../Offset';

const SocialLinksContacts = ({
  errors,
  handleChange,
  setFieldValue,
  contacts_social_fb,
  contacts_social_insta,
  contacts_social_vk,
  contacts_text,
}) => {
  return (
    <div className={style['cabinet_myshop__contacts_wrapper']}>
      <div className={style['cabinet_myshop__contacts_header']}>социальные сети</div>
      <div className={style['cabinet_myshop__contacts_line']}></div>

      <GxInput
        label="VK*"
        type="text"
        onGx-change={handleChange}
        value={contacts_social_vk}
        name={'contacts_social_vk'}
        placeholder="Введите ID страницы"
        className={style['cabinet_myshop__contacts_input']}
      >
        <GxIcon slot="suffix" src={vkIcon} />
      </GxInput>
      <GxInput
        label="Instagram*"
        type="text"
        onGx-change={handleChange}
        value={contacts_social_insta}
        name={'contacts_social_insta'}
        placeholder="Ссылка на ваш аккаунт"
        className={style['cabinet_myshop__contacts_input']}
      >
        <GxIcon slot="suffix" src={igIcon} />
      </GxInput>
      <GxInput
        label="Facebook*"
        type="text"
        onGx-change={handleChange}
        value={contacts_social_fb}
        name={'contacts_social_fb'}
        placeholder="Ссылка на ваш аккаунт"
        className={style['cabinet_myshop__contacts_input']}
      >
        <GxIcon slot="suffix" src={fbIcon} />
      </GxInput>
      {/* <GxTextarea
        label="Краткий текст"
        onGx-change={handleChange}
        value={contacts_text}
        name={'contacts_text'}
        placeholder="Введите текст"
        className={style['cabinet_myshop__contacts_input']}
      ></GxTextarea> */}
      <Offset offset={'content'} />
      <JoditField
        label="Краткий текст"
        placeholder="Введите текст"
        value={contacts_text}
        name={'contacts_text'}
        onBlurhandler={(newContent) => {
          setFieldValue('contacts_text', newContent);
        }}
      />
    </div>
  );
};

export default React.memo(SocialLinksContacts);
