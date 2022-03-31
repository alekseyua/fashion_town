import React, { useState } from 'react';
import { GxButton } from '@garpix/garpix-web-components-react';
import DefaultVariantStyle from './styles/DefaultVariant.module.scss';
import AccentVariantStyle from './styles/AccentVariant.module.scss';
import TabVariantStyle from './styles/TabVariant.module.scss';
import TabActiveVariantStyle from './styles/TabActiveVariant.module.scss';
import BlackBtnFullWidth from './styles/BlackBtnFullWidth.module.scss';
import BlackBtnFullWidthWithMargin from './styles/BlackBtnFullWidthWithMargin.module.scss';
import BlackBtn from './styles/BlackBtn.module.scss';
import LogoutBtn from './styles/LogoutBtn.module.scss';
import CabinetAccentBorder from './styles/CabinetAccentBorderVariant.module.scss';
import CabinetDefalut from './styles/CabinetDefaultVariant.module.scss';
import CabinetDefalutBorder from './styles/CabinetDefaultBorderVariant.module.scss';
import LooksLikeLink from './styles/LooksLikeLink.module.scss';
import changeRole from './styles/changeRole.module.scss';
import linkBtn from './styles/LinkBtn.module.scss';
import notFoundBtn from './styles/NotFound.module.scss';
import customClassNameDisactiv from './styles/disactive.module.scss';


import classNames from 'classnames';

const variantEnum = {
  default: 'default',
  accent: 'accent',
  tab: 'tab',
  tab_active: 'tab_active',
  black_btn_full_width: 'black_btn_full_width',
  black_btn_full_width_with_margin: 'black_btn_full_width_with_margin',
  black_btn: 'black_btn',
  logout: 'logout',
  cabinet_border_accent: 'cabinet_border_accent',
  cabinet_default: 'cabinet_default',
  cabinet_default_border: 'cabinet_default_border',
  looksLikeLink: 'looksLikeLink',
  changeRole: 'changeRole',
  backForm: 'backForm',
  link: 'linkBtn',
  notFound: 'notFoundBtn',
};

const getVariantStyleBtn = (variant = variantEnum.default) => {
  switch (variant) {
    case variantEnum.accent:
      return AccentVariantStyle['btn'];
    case variantEnum.tab:
      return TabVariantStyle['btn'];
    case variantEnum.tab_active:
      return TabActiveVariantStyle['btn'];
    case variantEnum.black_btn_full_width:
      return BlackBtnFullWidth['btn'];
    case variantEnum.black_btn_full_width_with_margin:
      return BlackBtnFullWidthWithMargin['btn'];
    case variantEnum.black_btn:
      return BlackBtn['btn'];
    case variantEnum.logout:
      return LogoutBtn['btn'];
    case variantEnum.cabinet_border_accent:
      return CabinetAccentBorder['btn'];
    case variantEnum.cabinet_default:
      return CabinetDefalut['btn'];
    case variantEnum.cabinet_default_border:
      return CabinetDefalutBorder['btn'];
    case variantEnum.looksLikeLink:
      return LooksLikeLink['btn'];
    case variantEnum.changeRole:
      return changeRole['btn'];
    case variantEnum.backForm:
      return DefaultVariantStyle['backForm'];
    case variantEnum.link:
      return linkBtn['btn'];
    case variantEnum.notFound:
      return notFoundBtn['btn'];
    default:
      return DefaultVariantStyle[variant];
  }
};

const Button = ({
  variant,
  onClick,
  className,
  gxVariant,
  children,
  iconLeft,
  iconRight,
  stateClickSend,
  disabled = false,
  ...props
}) => {
  
  const customClassName = classNames({
    [getVariantStyleBtn(variant)]: variant !== 'none',
    [className]: !!className,
    [customClassNameDisactiv.customClassNameDisactiv] : stateClickSend,
    // [customClassNameDisactiv.checkedState] : disabled,

  });
  return (
   <>
      {disabled?
        (  
        <GxButton
            {...props}
            onClick={onClick}
            variant={gxVariant}
            className={customClassName}
            iconLeft={iconLeft}
            iconRight={iconRight}
            disabled={''}
          >
            {iconLeft ? <gx-icon slot="icon-left" src={iconLeft}></gx-icon> : null}
            {children}
            {iconRight ? <gx-icon slot="icon-right" src={iconRight}></gx-icon> : null}
          </GxButton>
        ):(
          <GxButton
          {...props}
          onClick={onClick}
          variant={gxVariant}
          className={customClassName}
          iconLeft={iconLeft}
          iconRight={iconRight}

        >
          {iconLeft ? <gx-icon slot="icon-left" src={iconLeft}></gx-icon> : null}
          {children}
          {iconRight ? <gx-icon slot="icon-right" src={iconRight}></gx-icon> : null}
        </GxButton> 
      ) }
    </>
  );
};

export default React.memo(Button);
