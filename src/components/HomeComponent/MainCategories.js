import React from 'react';
import MainCategoriesLayout from '../../Views/MainCategoriesLayout';

const MainCategories = ({ banners }) => {
  return <MainCategoriesLayout banners={banners} />;
};

export default React.memo(MainCategories);
