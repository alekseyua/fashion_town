import React, { useState, useEffect } from 'react';
import CheckBox from '../../Views/CheckBox';
import CatalogViews from '../../Views/CatalogViews';
import api from '../../api';

const apiContent = api.contentApi;

const BrandsFilters = ({
  brands = [],
  values = { brands: [] },
  openBtnSubmit = false,
  loadData = () => {},
  setFieldValue = () => {},
  name = 'brands',
  role = { number: 2 },
}) => {
  const [sercheValue, setSercheValue] = useState(null);
  const [brandsRender, setBrandsRender] = useState([]);
  const [sertificate, setSertificate] = useState(false);
  const updateRenderProiduct = (e) => {
    const value = e.target.value;
    setSercheValue(value);
    apiContent
      .getBrands({
        title__icontains: value,
        sertificate: sertificate,
      })
      .then((res) => {
        setBrandsRender(res);
      });
  };
  const sercheHandler = (e) => {
    updateRenderProiduct(e);
  };
  const resetFilter = () => {
    setFieldValue(name, []);
    loadData(1, {
      ...values,
      [name]: [],
    });
  };

  useEffect(() => {
    setBrandsRender(brands);
  }, [brands]);

  return (
    <React.Fragment>
      <CatalogViews.BrandsFilters
        setSertificate={setSertificate}
        sertificate={sertificate}
        resetFilter={resetFilter}
        sercheHandler={sercheHandler}
        sercheValue={sercheValue}
        role={role}
        is_visibleViewAll={brandsRender.length}
      >
        {brandsRender.map((el) => {
          const id = String(el.id);
          const checked = values.brands.includes(id);

          return (
            <CatalogViews.LayoutCheckBoxItem key={id}>
              <CheckBox
                checked={checked}
                name={name}
                id={id}
                key={id}
                data-cy={`brandFilters-${el.id}`}
                onClick={(e) => {
                  if (e.target.tagName === 'SPAN') return;
                  const value = !!e.target.checked;
                  if (!Array.isArray(values.brands)) {
                    values.brands = [...values.brands];
                  }
                  if (!value) {
                    const newValue = values.brands.filter((el) => el !== id);
                    setFieldValue(name, newValue);
                  } else {
                    setFieldValue(name, [...values.brands, id]);
                  }
                  openBtnSubmit(e);
                }}
                variant="light"
                label={el.title}
              ></CheckBox>
            </CatalogViews.LayoutCheckBoxItem>
          );
        })}
      </CatalogViews.BrandsFilters>
    </React.Fragment>
  );
};

export default React.memo(BrandsFilters);
