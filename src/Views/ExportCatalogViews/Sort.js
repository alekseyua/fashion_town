import React from 'react';
import Select from '../Select';
import style from './styles/index.module.scss';

const Sort = ({ count = 'count', options = [], selectedSortFilters }) => {
  return (
    <div className={style['export__sort_wrap']}>
      {/* <Select
        onGx-change={(e) => {
          const value = e.target.value;
          selectedSortFilters(value);
        }}
        options={options}
        variant={'select-theme__black'}
        placeholder={"сортировать по ...."}
      /> */}
      <p className={style['export__sort_counter']}>{count} товаров (-a)</p>
    </div>
  );
};

export default React.memo(Sort);
