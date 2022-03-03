import React from 'react';
import style from '../index.module.scss';
import { GxIcon, GxInput, GxMenuItem, GxSelect } from '@garpix/garpix-web-components-react';
import { searchIcon } from '../../../images';
import classNames from 'classnames';
import Filter from './Filter';
import Search from './Search';

const FilterAndSearch = ({ search, children, onChangeSelect, loadData, filterParams }) => {
  return (
    <div
      className={classNames({
        [style['cabinet-clients__wrapper']]: true,
        [style['cabinet-clients__wrapper-margin_top']]: true,
      })}
    >
      <Filter onChangeSelect={onChangeSelect} children={children} />
      <Search search={search} loadData={loadData} filterParams={filterParams} />
    </div>
  );
};

export default React.memo(FilterAndSearch);
