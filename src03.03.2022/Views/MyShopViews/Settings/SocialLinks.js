import React from 'react';
import { GxInput, GxIcon } from '@garpix/garpix-web-components-react';
import { vkIcon, igIcon, fbIcon } from '../../../images';
import style from '../index.module.scss';

const SocialLinks = ({
  errors,
  footer_social_vk,
  footer_social_insta,
  footer_social_fb,
  handleChange,
}) => {
  return (
    <div className={style['cabinet_myshop__contacts_wrapper']}>
      <div className={style['cabinet_myshop__contacts_header']}>социальные сети</div>
      <div className={style['cabinet_myshop__contacts_line']}></div>
      <GxInput
        label="VK*"
        type="text"
        placeholder="Введите ID страницы"
        className={style['cabinet_myshop__contacts_input']}
        value={footer_social_vk}
        name={'footer_social_vk'}
        onGx-change={handleChange}
      >
        <GxIcon slot="suffix" src={vkIcon} />
      </GxInput>
      {errors.footer_social_vk ? <ErrorField message={errors.footer_social_vk} /> : null}
      <GxInput
        label="Instagram*"
        type="text"
        placeholder="Ссылка на ваш аккаунт"
        className={style['cabinet_myshop__contacts_input']}
        value={footer_social_insta}
        name={'footer_social_insta'}
        onGx-change={handleChange}
      >
        <GxIcon slot="suffix" src={igIcon} />
      </GxInput>
      {errors.footer_social_insta ? <ErrorField message={errors.footer_social_insta} /> : null}
      <GxInput
        label="Facebook*"
        type="text"
        placeholder="Ссылка на ваш аккаунт"
        className={style['cabinet_myshop__contacts_input']}
        value={footer_social_fb}
        name={'footer_social_fb'}
        onGx-change={handleChange}
      >
        <GxIcon slot="suffix" src={fbIcon} />
      </GxInput>
      {errors.footer_social_fb ? <ErrorField message={errors.footer_social_fb} /> : null}
    </div>
  );
};

export default React.memo(SocialLinks);
