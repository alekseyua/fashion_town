import React from 'react';
import { GxCol } from '@garpix/garpix-web-components-react';
import style from './coll.module.scss';

const Coll = ({ children, ...props }) => {
  return (
    <GxCol {...props} className={style['coll']}>
      {children}
    </GxCol>
  );
};

export default React.memo(Coll);
