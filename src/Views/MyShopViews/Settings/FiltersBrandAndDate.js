import React, { useState } from 'react';
import Select from '../../Select';
import { GxMenuItem } from '@garpix/garpix-web-components-react';
import DatePicker from 'react-date-picker';
import classNames from 'classnames';
import dayjs from '../../../utils/dayjs';
import api from '../../../api';
import style from '../index.module.scss';

const thisDate = new Date();

const FiltersBrandAndDate = ({ brands = [], loadData, filterParams }) => {
  const { brand = null } = filterParams;
  const [state, setstate] = useState({
    created_at__lte: filterParams.created_at__lte ?? new Date(),
    created_at__gte:
      filterParams.created_at__gte ?? new Date(thisDate.setFullYear(thisDate.getFullYear() + 1)),
  });

  const selectCreateFrom = (date) => {
    setstate({
      ...state,
      created_at__gte: date,
    });
    loadData(1, {
      ...filterParams,
      created_at__gte: dayjs('en', date).format(),
    });
  };

  const selectCreateTo = (date) => {
    setstate({
      ...state,
      created_at__lte: date,
    });
    loadData(1, {
      ...filterParams,
      created_at__lte: dayjs('en', date).format(),
    });
  };

  return (
    <div className={style['cabinet_myshop__live_filters']}>
      <Select
        value={brand}
        onGx-blur={(e) => {
          const value = e.target.value;
          loadData(1, {
            ...filterParams,
            brand: value,
          });
        }}
        variant={'select-theme__black'}
      >
        {brands.map((el, i) => {
          return (
            <GxMenuItem key={i} value={el.id}>
              {el.title}
            </GxMenuItem>
          );
        })}
      </Select>
      <div className={style['cabinet_myshop__live_datepicker_wrap']}>
        <DatePicker
          value={state.created_at__gte}
          onChange={selectCreateFrom}
          className={classNames({
            datepicker: true,
            [style['cabinet_myshop__live_datepicker_wrap']]: true,
          })}
        />
        <div className={style['cabinet_myshop__live_datepicker_rectangle']}></div>
        <DatePicker
          value={state.created_at__lte}
          onChange={selectCreateTo}
          className={classNames({
            datepicker: true,
            [style['cabinet_myshop__live_datepicker_wrap']]: true,
          })}
        />
      </div>
    </div>
  );
};

export default React.memo(FiltersBrandAndDate);
