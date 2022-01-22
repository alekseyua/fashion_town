export const FILTER_PARAMS = {
  is_in_stock: 'is_in_stock',
  is_bestseller: 'is_bestseller',
  is_new: 'is_new',
  is_closeout: 'is_closeout',
  is_not_range: 'is_not_range',
  is_in_collection: 'is_in_collection',
  sizes: 'sizes',
  colors: 'colors',
  categories: 'categories',
  category: 'category',
  brands: 'brands',
  page: 'page',
  page_size: 'page_size',
  is_import: 'is_import',
  is_polish: 'is_polish',
};

export const deepSerche = (id, array) => {
  let result;
  const rParseArr = (id, array) => {
    array.forEach((element) => {
      if (element.children.length) {
        element.children.forEach((elChild) => {
          if (elChild.id === id) result = elChild.title;
        });
      }
      if (element.id === id) result = element.title;
    });
  };
  rParseArr(id, array);
  return result;
};
