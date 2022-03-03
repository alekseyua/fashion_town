import React from 'react';
import { GxButton } from '@garpix/garpix-web-components-react';
import style from '../styles/index.module.scss';

const OrderingAddressAddBtn = ({ onClick, buttonText = '+ добавить новый адрес' }) => {
   return (
    <GxButton
      onClick={onClick}
      type="text"
      className={style['ordering_address__card_newbtn']}
    >
      {buttonText}
    </GxButton>
  );
};

export default React.memo(OrderingAddressAddBtn);
