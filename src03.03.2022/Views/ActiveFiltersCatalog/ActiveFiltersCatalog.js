import React from 'react';

/**
 * ?структура временная просто для наглядности но типы данных точно такие будут
 * @param {[nameFilter: "одежда", cansel: () => {}, title: "трусы"]} param0
 */
const ActiveFiltersCatalog = ({ activeFilters = [] }) => {
  return (
    <div>
      {activeFilters.map((el, i) => {
        return (
          <div key={i}>
            <div>
              {el.nameFilter}
              {el.title}
            </div>
            <div onClick={el.cansel}></div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(ActiveFiltersCatalog);
