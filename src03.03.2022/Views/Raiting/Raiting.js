import React from 'react';
import { GxRating } from '@garpix/garpix-web-components-react';

const Raiting = ({
  disabled,
  removeFocus = () => {},
  setFocus = () => {},
  onChange = () => {},
  getSymbol,
  max,
  precision,
  readonly,
  value,
}) => {
  return (
    <GxRating
      disabled={disabled}
      // removeFocus={removeFocus}
      // setFocus={setFocus}
      onGx-change={onChange}
      max={max}
      precision={precision}
      readonly={readonly}
      value={value}
    />
  );
};

export default React.memo(Raiting);
