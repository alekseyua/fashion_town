import React, { useState, useEffect } from 'react';
import { FILTER_PARAMS } from './utils';
import CatalogViews from '../../Views/CatalogViews';

const Categories = ({ categories, filterParams, loadData, activePage, initialValues }) => {
  /**------------------------------------------------------------------ */

  const checkDefaultCategory = (categories, currentFilterParams, filterParams) => {

    let activeCategory = null;
    let activeSubCategory = null;
    if (currentFilterParams[filterParams.category]) {
      let selectedcategories = currentFilterParams[filterParams.category].split(',');
      if (selectedcategories.length === 1) {
        selectedcategories = Number(selectedcategories[0]);
        categories.forEach((el) => {
          if (el.id === selectedcategories) {
            activeCategory = el.id;
          } else {
            el.children.forEach((elChildren) => {
              if (elChildren.id === selectedcategories) {
                activeCategory = el.id;
                activeSubCategory = selectedcategories;
              }
            });
          }
        });
      }
    }
    return {
      activeCategory,
      activeSubCategory,
    };
  };
/**------------------------------------------------------------------ */
  const [isOpenCategory, setIsOpenCategory] = useState({
    activeCategory: null,
    activeSubCategory: null,
  });
/**------------------------------------------------------------------ */
  const updateCardSet = (id) => {
    
      loadData(1, {
      ...filterParams,
      categories: [],
      [FILTER_PARAMS.category]: id,
    });
  };
/**------------------------------------------------------------------ */
// 
  const setOpenCategory = (id) => {
    
    const selectedId = isOpenCategory.activeCategory === id ? null : id;
    setIsOpenCategory({
      activeSubCategory: null,
      activeCategory: selectedId,
    });
    updateCardSet(selectedId);
  };
/**------------------------------------------------------------------ */
  const setOpenSubCategory = (id) => {
    
    const selectedId = isOpenCategory.activeSubCategory === id ? null : id;
    setIsOpenCategory({
      ...isOpenCategory,
      activeSubCategory: selectedId,
    });
    updateCardSet(selectedId ?? isOpenCategory.activeCategory);
  };
/**------------------------------------------------------------------ */
  useEffect(() => {
    const categoriesdata = categories
    // categoriesdata.unshift({
    //   children: [],
    //   filter: '',
    //   id: '',
    //   parent: null,
    //   slug: '',
    //   title: 'Показать все',
    // });
    let data = checkDefaultCategory(categoriesdata, filterParams, FILTER_PARAMS);
    setIsOpenCategory(data);
  }, [categories]);

  /**------------------------------------------------------------------ */
  return (
    <CatalogViews.Categories
      categories={categories}
      setOpenCategory={setOpenCategory}
      setOpenSubCategory={setOpenSubCategory}
      isOpenCategory={isOpenCategory}
    />
  );
};

export default React.memo(Categories);
