import React from 'react';
import classNames from 'classnames';
import style from './select.module.scss';
import { GxSelect, GxMenuItem, GxIcon } from '@garpix/garpix-web-components-react';
import { infoWhite } from '../../images';
import { v4 } from 'uuid';

const Select = ({
  className,
  label,
  placeholder,
  options = [],
  selectSettings,
  variant,
  children,
  ...props
}) => {
  //? selectSettings
  //? https://gitlab.com/garpix/frontend_modules/garpix-web-components/-/blob/dev/docs/components/select.md

  //? options
  //? в элемент можно подсунуть все нужные параметры
  //? https://gitlab.com/garpix/frontend_modules/garpix-web-components/-/tree/dev/src/components/gx-menu-item

  //largeCustomLabel

  const variantEnum = {
    default: 'default',
    black: 'black',
  };

  const getVariantStyleSelect = (variant = variantEnum.default) => {
    switch (variant) {
      case variantEnum.black:
        return BlackStyle['select'];
      default:
        return DefaultStyle['select'];
    }
  };

  const customClassName = classNames({
    [style[variant]]: true,
    [style[className]]: !!className,
  });

  return (
    <GxSelect
      {...selectSettings}
      {...props}
      className={customClassName}
      label={label}
      placeholder={placeholder}
    >
      {children}
      {options.map((el, i) => {
        const { title, value, ...elData } = el;
        return (
          <GxMenuItem key={i} value={value} {...elData}>
            {title}
          </GxMenuItem>
        );
      })}
      <GxIcon slot="suffix" src={infoWhite} />
    </GxSelect>
  );
};

export default React.memo(Select);
