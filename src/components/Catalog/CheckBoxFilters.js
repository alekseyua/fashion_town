import React, { useState, useEffect } from 'react';
import { FILTER_PARAMS } from './utils';
import CatalogViews from '../../Views/CatalogViews';

const CheckBoxFilters = ({
  filterParams = {},
  loadData = () => {},
  activePage = 1,
  role = { number: 2 },
}) => {
  const defaultValues = {
    is_in_stock: filterParams.is_in_stock,
    is_new: filterParams.is_new,
    is_closeout: filterParams.is_closeout,
    is_bestseller: filterParams.is_bestseller,
    is_in_collection: filterParams.is_in_collection,
    is_not_range: filterParams.is_not_range,
    is_import: filterParams.is_import,
    is_polish: filterParams.is_polish,
  };
  // вкладываем занчени нашего выбора -> is_in_stock : true
  const [values, setValues] = useState(defaultValues);

  // отслеживаем клик по категории в наличии
  const handleChangeFilters = (key, e) => {
    const value = e.target.checked;
    if (e.target.checked === null) return;
    setValues({
      ...values,
      [key]: value,
    });
    if (value ?? false) {
      loadData(activePage, {
        ...filterParams,
        [key]: value,
      });
    } else {
      delete filterParams[key];
      loadData(activePage, filterParams);
    }
  };

  //console.log('filterParams', filterParams);
  useEffect(() => {
    setValues({
      is_in_stock: filterParams.is_in_stock ?? null,
      is_new: filterParams.is_new ?? null,
      is_bestseller: filterParams.is_bestseller ?? null,
      is_closeout: filterParams.is_closeout ?? null,
      is_in_collection: filterParams.is_in_collection ?? null,
      is_not_range: filterParams.is_not_range ?? null,
      is_import: filterParams.is_import ?? null,
      is_polish: filterParams.is_polish ?? null,
    });
  }, [filterParams]);
  
  return (
    <CatalogViews.CheckBoxFilters
      values={values}
      handleChangeFilters={handleChangeFilters}
      fp_const={FILTER_PARAMS}
      role={role}
    />
  );
};

export default React.memo(CheckBoxFilters);
