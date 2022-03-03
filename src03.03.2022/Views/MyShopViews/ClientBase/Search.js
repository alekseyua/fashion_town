import React from 'react';
import style from '../index.module.scss';
import { GxIcon, GxInput } from '@garpix/garpix-web-components-react';
import { searchIcon } from '../../../images';

const Search = ({ search, loadData, filterParams }) => {
  return (
    <GxInput
      placeholder={search}
      onGx-change={(e) => {
        loadData(1, {
          ...filterParams,
          search: e.target.value,
        });
      }}
      className={style['cabinet-clients__search']}
    >
      <GxIcon slot="prefix" src={searchIcon} />
    </GxInput>
  );
};

export default React.memo(Search);
