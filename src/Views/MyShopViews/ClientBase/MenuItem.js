import React from 'react';
import { GxMenuItem } from '@garpix/garpix-web-components-react';

const MenuItem = ({ value, title }) => {
  return <GxMenuItem value={value}>{title}</GxMenuItem>;
};

export default React.memo(MenuItem);
