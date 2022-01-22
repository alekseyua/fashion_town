import React from 'react';
import style from '../index.module.scss';
import { GxButton } from '@garpix/garpix-web-components-react';

const AddPromoCode = (props) => {
  return (
    <GxButton {...props} variant="text" className={style['cabinet-promocode__new']}>
      + создать промокод
    </GxButton>
  );
};

export default React.memo(AddPromoCode);
