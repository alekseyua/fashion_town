import React, { useState, useEffect } from 'react';
import { FILTER_PARAMS } from './utils';
import CheckBox from '../../Views/CheckBox';
import api from '../../api';
import CatalogViews from '../../Views/CatalogViews';
import { debounce } from '../../utils';

const apiContent = api.contentApi;

const TypeProductFilters = ({
  categories = [],
  values = { categories: [] },
  handleSubmit,
  setFieldValue = () => {},
  setIsShowBtnSubmit,
  setOffsetTopBtnSubmit,
  loadData = () => {},
  openBtnSubmit = () => {},
  name = `categories`,
}) => {
  const [renderTypeProductCheckBox, setRenderTypeProductCheckBox] = useState([]);
  const [sercheValue, setSercheValue] = useState(null);
  const updateRenderProiduct = (e) => {
    const value = e.target.value;
    setSercheValue(value);
    apiContent
      .getCategory({
        title__icontains: value,
      })
      .then((res) => {
        setRenderTypeProductCheckBox(recursParseCategory(res));
      });
  };
  const sercheTypeProduct = (e) => {
    updateRenderProiduct(e);
  };
  const resetFilter = () => {
    
    setFieldValue(name, []);
    loadData(1, {
      ...values,
      [name]: [],
    });
  };
  const recursParseCategory = (data = []) => {
    let listcategories = [];
    const getListCategoryData = (category) => {
      
      if (category.children?.length) {
        // listcategories.push(category);
        // category.children.forEach((categoryChild) => {
        //   getListCategoryData(categoryChild);
        // });
      } else {
        listcategories.push(category);
      }
    };
    if (!Array.isArray(data)) {
      data = data.results;
    }
    data.forEach((category) => {
      getListCategoryData(category);
    });
    return listcategories;
  };

  useEffect(() => {
    setRenderTypeProductCheckBox(recursParseCategory(categories));
  }, [categories]);

  return (
    <CatalogViews.TypeProductFilters
      sercheValue={sercheValue}
      sercheTypeProduct={sercheTypeProduct}
      resetFilter={resetFilter}    
      is_visibleViewAll={renderTypeProductCheckBox.length}
    >
      {renderTypeProductCheckBox.map((el, i) => {
        const id = String(el.id);
        return (
          <CatalogViews.LayoutCheckBoxItem key={id}>
            <CheckBox
              checked={values.categories.includes(id)}
              name={name}
              id={id}
              key={id}
              onClick={(e) => {
                const value = e.target.checked;
                if (value === null) return;
                if (!value) {
                  if (!Array.isArray(values.categories)) {
                    values.categories = [values.categories];
                  }
                  const newValue = values.categories.filter((el) => el !== id);
                  setFieldValue(name, newValue);
                } else {
                  setFieldValue(name, [...values.categories, id]);
                }
                openBtnSubmit(e);
              }}
              variant="light"
              label={el.title}
              data-cy={`categoriesCheckBox-${el.id}`}
            ></CheckBox>
            <CatalogViews.CountItemsCheckBox>{el.count ?? 0}</CatalogViews.CountItemsCheckBox>
          </CatalogViews.LayoutCheckBoxItem>
        );
      })}
    </CatalogViews.TypeProductFilters>
  );
};

export default React.memo(TypeProductFilters);
