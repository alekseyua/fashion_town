import React from 'react';
import style from '../index.module.scss';
import { GxSelect } from '@garpix/garpix-web-components-react';

const Filter = ({ children, onChangeSelect }) => {
  return (
    <GxSelect
      placeholder={'сортировать по ....'}
      onGx-change={(e) => {
        onChangeSelect(e.target.value);
      }}
      className={style['cabinet-clients__select']}
    >
      {children}
    </GxSelect>
  );
};

export default React.memo(Filter);
