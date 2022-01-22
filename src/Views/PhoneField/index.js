import React from 'react';
import { GxPhoneInput } from '@garpix/garpix-web-components-react';
import style from './styles/index.module.scss';

const PhoneField = ({ variant, labelVariant, label, children, helpText = null, ...props }) => {
  return (
    <label className={style[labelVariant]}>
      {label}
      <GxPhoneInput className={style[variant]} {...props}>
        {children}
      </GxPhoneInput>
      {helpText}
    </label>
  );
};

export default React.memo(PhoneField);
