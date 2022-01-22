import React from 'react';
import { GxTextarea } from '@garpix/garpix-web-components-react';
import classNames from 'classnames';
import DefaultStyle from './styles/default.module.scss';
/**
 * @see https://gitlab.com/garpix/frontend_modules/garpix-web-components/-/blob/master/docs/components/textarea.md
 * @param {*} param0
 */
//todo: другие стили textarea
// const variantEnum = {
//   default: 'default',
//   large: 'large',
//   largeCustomLabel: 'largeCustomLabel',
//   light: 'light',
//   dark: 'dark',
// };
const getVariantStyleInput = (variant = 'input') => {
  switch (variant) {
    default:
      return DefaultStyle[variant];
  }
};

const TextArea = ({
  variant,
  children,
  value,
  label,
  placeholder,
  className,
  resize,
  maxlength,
  rows,
  ...props
}) => {
  const classNameCustom = classNames({
    [getVariantStyleInput(variant)]: true,
    [DefaultStyle[className]]: !!className,
  });
  return (
    <GxTextarea
      label={label}
      placeholder={placeholder}
      value={value}
      className={classNameCustom}
      resize={resize}
      maxlength={maxlength}
      rows={rows}
      {...props}
    >
      {children}
    </GxTextarea>
  );
};

export default React.memo(TextArea);
