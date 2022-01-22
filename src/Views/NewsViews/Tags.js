import React from 'react';
import Button from '../Button';
import classNames from 'classnames';
import style from './styles/index.module.scss';

const Tags = ({ rubrics = [], filterParams, loadData, activePage }) => {
  const handleFilter = (id) => {
    let params = {
      ...filterParams,
      rubrics: id,
    };
    if (!id) delete params['rubrics'];
    loadData(activePage, params);
  };
  return (
    <div className={style['wrapper_filters']}>
      <Button
        onClick={() => handleFilter(null)}
        className={classNames({
          [style['wrapper_filters__button']]: true,
          [style['wrapper_filters__button-active']]: !!!filterParams.rubrics,
        })}
      >
        Все
      </Button>
      {rubrics.map((el) => {

        return (
          <Button
            onClick={() => handleFilter(el.id)}
            className={classNames({
              [style['wrapper_filters__button']]: true,
              [style['wrapper_filters__button-active']]:
                Number(filterParams.rubrics) === Number(el.id),
            })}
          >
            {el.title}
          </Button>
        );
      })}
    </div>
  );
};

export default React.memo(Tags);
