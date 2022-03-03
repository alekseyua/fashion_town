import React from 'react';
import { GxInput } from '@garpix/garpix-web-components-react';
import DefaultStyle from './styles/Default.module.scss';
import LargeStyle from './styles/Large.module.scss';
import LargeCustomLabelStyle from './styles/LargeCustomLabelStyle.module.scss';
import LightStyle from './styles/Light.module.scss';
import DarkStyle from './styles/Dark.module.scss';
import classNames from 'classnames';

const variantEnum = {
  default: 'default',
  large: 'large',
  largeCustomLabel: 'largeCustomLabel',
  light: 'light',
  dark: 'dark',
};

const getVariantStyleInput = (variant = 'input') => {
  switch (variant) {
    case variantEnum.large:
      return LargeStyle['input'];
    case variantEnum.largeCustomLabel:
      return LargeCustomLabelStyle['input'];
    case variantEnum.light:
      return LightStyle['input'];
    case variantEnum.dark:
      return DarkStyle['input'];
    default:
      return DefaultStyle[variant];
  }
};

const Input = ({ variant, className, label, placeholder, value, children, helpText, ...props }) => {
  const classNameCustom = classNames({
    [getVariantStyleInput(variant)]: true,
    [DefaultStyle[className]]: !!className,
  });
  return (
    <GxInput
      value={value}
      className={classNameCustom}
      label={label}
      placeholder={placeholder}
      {...props}
    >
      {helpText}
      {children}
    </GxInput>
  );
};
export default React.memo(Input);
