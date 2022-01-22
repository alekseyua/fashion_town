import React from 'react';
import { GxIcon, GxInput } from '@garpix/garpix-web-components-react';
import { searchIcon } from '../../../images';
import style from '../styles/style.module.scss';

const SearchOrders = ({ searchValue, onChangeSearchField }) => {
  return (
    <GxInput
      onGx-input={onChangeSearchField}
      value={searchValue}
      placeholder="Поиск по № заказа и ФИО"
      className={style['cabinet-clients__search']}
    >
      <GxIcon slot="prefix" src={searchIcon} />
    </GxInput>
  );
};

export default React.memo(SearchOrders);
