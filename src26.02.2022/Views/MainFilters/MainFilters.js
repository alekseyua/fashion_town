import React, { useState } from 'react';
import style from './mainFilters.module.scss';
import Button from '../Button';
import classNames from 'classnames';

const MainFilters = (props) => {
  let { filters = [], loadData, initialFilters, activePage, setFilterList, customClass } = props;
  const setFilters = (id) => {
    loadData(activePage, {
      ...initialFilters,
      categories: id,
    });
    setFilterList(
      filters.map((el) => {
        return {
          ...el,
          active: el.id === id,
        };
      }),
    );
  };
  return (
    <div className={classNames({
      [style['main-filters']]:true, 
      [style[customClass]]:customClass,
    })}>
      <div className={'container'}>
        <div className={style['main-filters-wrap']}>
          <ul className={style['main-filters__list']}>
            {filters.map((el, key) => {
              return (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setFilters(el.id);
                  }}
                  key={el.id}
                  variant={el.active ? 'tab_active' : 'tab'}
                >
                  {el.title}
                </Button>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainFilters);
