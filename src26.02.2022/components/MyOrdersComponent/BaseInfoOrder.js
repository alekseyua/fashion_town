import React, { useState, useEffect } from 'react';
import Select from '../../Views/Select';
import style from '../../Views/MyOrderViews/styles/index.module.scss';
import Text from '../Text';

import DatePicker from 'react-date-picker';
import dayjs from '../../utils/dayjs';
import classNames from 'classnames';
import api from '../../api';

const thisDate = new Date();

const BaseInfoOrder = ({ statuses, loadData, activePage, filterParams, count }) => {
  const [state, setstate] = useState({
    created_at__lte:  filterParams.created_at__gte ?? new Date(thisDate.setFullYear(thisDate.getFullYear())),
    created_at__gte:filterParams.created_at__lte ?? new Date(),
     
  });
  const options = statuses.map((el) => {
    return {
      title: `${el.title} (${el.count})`,
      value: el.status,
    };
  });
  options.unshift({
    title: `Все заказы`,
    value: null,
  });
  const [statusFildValue, setStatusFildValue] = useState(null);
  const changeStatusFilter = (e) => {
    setStatusFildValue(e.target.value);
    const params =  {
      ...filterParams,
      status: e.target.value,
    };
    loadData(activePage, params, false);
  };
  const selectCreateTo = (date) => {
    setstate({
      ...state,
      created_at__gte: date,
    });
    loadData(1, {
      ...filterParams,
      created_at__gte: dayjs(api.language, date).format(),
    });
  };
  const selectCreateFrom = (date) => {
    setstate({
      ...state,
      created_at__lte: date,
    });
    loadData(1, {
      ...filterParams,
      created_at__lte: dayjs(api.language, date).format(), //format('DD.MM.YYYY')
    });
  };
  return (
    <div className={style['cabinet-content']}>
      <div className={style['cabinet-heading']}>
        <Text text={'my.orders'} />
      </div>
      <div className={style['cabinet-topfilter']}>
        <div className={style['cabinet-topfilter__left']}>
          <Select
            variant={'select-theme__black'}
            value={statusFildValue}
            placeholder={Text({ text: 'status' })}
            options={options}
            onGx-change={changeStatusFilter}
          ></Select>
        </div>
        <div className={style['wrapper_filter-group']}>
        <DatePicker
          clearIcon={null}
           onChange={selectCreateTo}
          value={state.created_at__gte}
            format={'dd.MM.yyyy'}

          className={classNames({
            datepicker: true,
            [style['wrapper_filter-group__datepicker']]: true,
          })}
        />
        <span className={style['wrapper_filter-group__datepicker-hyphen']}>-</span>
        <DatePicker
          clearIcon={null}
          className={classNames({
            datepicker: true,
            [style['wrapper_filter-group__datepicker']]: true,
          })}
          onChange={selectCreateFrom}
          // date={("23/10/2015", "DD/MM/YYYY")}
           value={state.created_at__lte}
            // defaultValue={dayjs(api.language, state.created_at__lte).format('DD.MM.YYYY')}
            format={'dd.MM.yyyy'}
            // showNavigation:true
        />
      </div>
      </div>
     
    </div>
  );
};

export default React.memo(BaseInfoOrder);
