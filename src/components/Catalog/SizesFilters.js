import React, { useState, useEffect } from 'react';
import { FILTER_PARAMS } from './utils';
import CheckBox from '../../Views/CheckBox';
import CatalogViews from '../../Views/CatalogViews';

const SizesFilters = ({
  sizes = [],
  values = { sizes: [] },
  setFieldValue = () => {},
  openBtnSubmit = () => {},
  loadData = () => {},
}) => {
  return (
    <CatalogViews.SizesFilters>
      {sizes.map((el, i) => {
        const name = `sizes`;
        const id = String(el.id);
        return (
          <CatalogViews.LayoutCheckBoxItem key={id}>
            <CheckBox
              checked={values.sizes.includes(id)}
              name={name}
              id={id}
              key={id}
              onClick={(e) => {
                const value = e.target.checked;
                if (value === null) return;
                if (!value) {
                  if (!Array.isArray(values.sizes)) {
                    values.sizes = [values.sizes];
                  }
                  const newValue = values.sizes.filter((el) => el !== id);
                  setFieldValue(name, newValue);
                } else {
                  setFieldValue(name, [...values.sizes, id]);
                }
                openBtnSubmit(e);
              }}
              variant="light"
              label={el.title}
              data-cy={`sizesCheckBox-${el.id}`}
            ></CheckBox>
          </CatalogViews.LayoutCheckBoxItem>
        );
      })}
    </CatalogViews.SizesFilters>
  );
};

export default React.memo(SizesFilters);
