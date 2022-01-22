import React, { useState, useEffect } from 'react';
import Select from '../Select';
import DatePicker from 'react-date-picker';
import style from './styles/index.module.scss';
import classNames from 'classnames';
import { userIcon } from '../../images';
import { GxIcon } from '@garpix/garpix-web-components-react';
import dayjs from '../../utils/dayjs';

const thisDate = new Date();

const Filters = ({ brands: brandProp, loadData, filterParams }) => {
  const [state, setstate] = useState({
    created_at__lte: filterParams.created_at__lte ?? new Date(),
    created_at__gte:
      filterParams.created_at__gte ?? new Date(thisDate.setFullYear(thisDate.getFullYear() + 1)),
  });
  const [brandData, setbrandData] = useState({ options: brandProp, value: filterParams.brand });
  const selectCreateFrom = (date) => {
    setstate({
      ...state,
      created_at__gte: date,
    });
    loadData(1, {
      ...filterParams,
      created_at__gte: dayjs('en', date).format(),//format('DD.MM.YYYY')
    });
  };
  const selectCreateTo = (date) => {
    setstate({
      ...state,
      created_at__gte: date,
    });
    loadData(1, {
      ...filterParams,
      created_at__gte: dayjs('en', date).format(),//format('DD.MM.YYYY')
    });
  };

  const isNewOptions = [
    {
      value: '-created_at',
      title: 'От старых к новым',
    },
    {
      value: 'created_at',
      title: 'От новых к старым',
    },
  ];
  useEffect(() => {
    // brandProp.unshift({
    //   title: `Все заказы`,
    //   value: null,
    // });
    setbrandData({ options: brandProp, value: filterParams.brand });
  }, [brandProp, filterParams]);
  return (
    <div className={style['wrapper_filter']}>
      <div className={style['wrapper_filter-group']}>
        <Select
          placeholder={'Выберите бренд'}
          onGx-blur={(e) => {
            const value = e.target.value;
            loadData(1, { ...filterParams, brand: value });
          }}
          value={brandData.value}
          options={
            brandData.options.length
              ? brandData.options.map((el) => {
                  return {
                    value: el.id,
                    title: el.title,
                  };
                })
              : []
          }
          variant={'black-default'}
        >
          <GxIcon src={userIcon} slot={'suffix'} />
        </Select>
        <Select
          placeholder={'Сортировка'}
          defaultValue={filterParams.ordering}
          onGx-change={(e) => {
            const value = e.target.value;
            loadData(1, { ...filterParams, ordering: value });
          }}
          options={isNewOptions}
          variant={'black-default'}
        />
      </div>
      <div className={style['wrapper_filter-group']}>
        <DatePicker
          clearIcon={null}
          onChange={selectCreateTo}
          value={state.created_at__gte}
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
          value={state.created_at__lte}
        />
      </div>
    </div>
  );
};
export default React.memo(Filters);
