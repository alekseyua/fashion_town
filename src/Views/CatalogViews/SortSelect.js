import React from 'react';
import Select from '../Select';
import style from './styles/index.module.scss';

const SortSelect = ({ options = [], selectedSortFilters }) => {
  // options значение в выпадающем списке
  return (
    <div className={style['catalog-sort']}>
      <Select
        variant={'select-theme__black'}
        onGx-change={(e) => {
          const value = e.target.value;
          selectedSortFilters(value);
        }}
        options={options}
        placeholder={"сортировать по ...."}
      ></Select>
    </div>
  );
};

export default React.memo(SortSelect);
