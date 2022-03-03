import React from 'react';
import style from './mainFilters.module.scss';
import Button from '../Button';

const FiltersReviewsHome = ({ filters = [], setFilters = () => {} }) => {
  const setFiltersLocal = (id) => {
    let newFilter = filters.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          active: true,
        };
      } else {
        return {
          ...el,
          active: false,
        };
      }
    });
    setFilters(newFilter);
  };
  return (
    <div className={style['main-filters']}>
      <div className={'container'}>
        <div className={style['main-filters-wrap']}>
          <ul className={style['main-filters__list']}>
            {filters.map((el, key) => {
              return (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setFiltersLocal(el.id);
                  }}
                  key={el.id}
                  variant={el.active ? 'tab_active' : 'tab'}
                  data-cy={`buttonTab-${el.title}`}
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

export default React.memo(FiltersReviewsHome);
