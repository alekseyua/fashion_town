import React from 'react';
import CheckBox from '../../Views/CheckBox';
import CatalogViews from '../../Views/CatalogViews';

const ColorsFilters = ({
  colors = [],
  values = { colors: [] },
  setFieldValue = () => {},
  openBtnSubmit = () => {},
  name = 'colors',
}) => {

  return (
    <CatalogViews.ColorsFilters>
      {colors.map((el, i) => {
        const id = String(el.id);
        return (
          <CatalogViews.LayoutCheckBoxItem key={id}>
            <CheckBox
              key={id}
              checked={values.colors.includes(id)}
              name={name}
              id={id}
              //  onGx-change={(e) => {
              //    openBtnSubmit(e);
              //  }}
              data-cy={`colorFilters-${el.id}`}
              onGx-change={(e) => {
                const value = e.target.checked;
                if (value === null) return;
                if (!value) {
                  if (!Array.isArray(values.colors)) {
                    values.colors = [values.colors];
                  }
                  const newValue = values.colors.filter((el) => el !== id);
                  setFieldValue(name, newValue);
                } else {

                  setFieldValue(name, [...values.colors, id]);
                }
               openBtnSubmit(e);
              }}
              colorField={el.color}
              variant="light"
              label={el.title}
            ></CheckBox>
          </CatalogViews.LayoutCheckBoxItem>
        );
      })}
    </CatalogViews.ColorsFilters>
  );
};

export default React.memo(ColorsFilters);
