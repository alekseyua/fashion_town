import React from 'react';
import { GxCheckbox } from '@garpix/garpix-web-components-react';
import DefaultStyle from './Default.module.scss';
import classNames from 'classnames';

const variantEnum = {
  default: 'default',
  large: 'large',
  light: 'light',
  switch: 'switch',
};

const getVariantStyleCheckbox = (variant = variantEnum.default) => {
  switch (variant) {
    case variantEnum.large:
      return DefaultStyle['large'];
    case variantEnum.switch:
      return DefaultStyle['switch'];
    case variantEnum.light:
      return DefaultStyle['light'];
    default:
      return DefaultStyle['input'];
  }
};

const CheckBox = ({
  label,
  variant,
  checked = "false",
  disabled,
  colorField,
  className,
  name,
  ...props
}) => {
  //todo: чтоб не светился ошибками сделаю мега костыль не бейте пж
  if (!checked) checked = false;
  const classNameCustom = classNames({
    [getVariantStyleCheckbox(variant)]: true,
    [DefaultStyle[className]]: !!className,
  });
  return (
    <GxCheckbox
      className={classNameCustom}
      checked={checked}
      disabled={disabled}
      name={name}
      label={label}
      colorField={colorField}
      {...props}
    >
      {colorField ? (
        <span style={{ backgroundColor: colorField }} className={DefaultStyle['icon']}></span>
      ) : null}
      <span>{label}</span>
    </GxCheckbox>
  );
};

export default React.memo(CheckBox);
