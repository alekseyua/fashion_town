import React from 'react';
import { GxInput, GxIcon } from '@garpix/garpix-web-components-react';
import { searchIcon } from '../../../images';
import style from '../styles/index.module.scss';

const OrderingAddressSearcheInput = ({ searchAddressRenderData }) => {
  return (
    <GxInput
      onGx-change={(e) => {
        searchAddressRenderData(e.target.value);
      }}
      placeholder="Поиск по ФИО"
      className={style['ordering_address__search']}
    >
      <GxIcon slot="prefix" className={style['ordering_address__search_icon']} src={searchIcon} />
    </GxInput>
  );
};

export default React.memo(OrderingAddressSearcheInput);
