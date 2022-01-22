import React, { useState, useEffect } from 'react';
import MyShop from '../../Views/MyShopViews';
import api from '../../api';
import CatalogViews from '../../Views/CatalogViews';

const contentApi = api.contentApi;

const CategoryMarkup = ({ setPage, page }) => {
  const [categorys, setcategorys] = useState([]);

  const handleChange = (e, id) => {
    const params = {
      markup: e.target.value,
    };
    contentApi.updateShopCategoryMarkup(id, params).then((res) => {});
  };

  useEffect(() => {
    contentApi.getShopCategoryMarkup().then((res) => {
      setcategorys(res.results);
    });
  }, []);
  return (
    <React.Fragment>
      <MyShop.AllProduct.ChoseCatalog
        nameOfStyle="cabinet_market__catlink_wrapper-desktop"
        page={page}
        setPage={setPage}
      />
      <CatalogViews.CategoryMarkup>
        {categorys.map((el, i) => {
          return (
            <MyShop.AllProduct.Product
              handleChange={handleChange}
              key={el.category_id}
              category_markup_id={el.category_markup_id}
              category_id={el.category_id}
              product={el.title}
              markup={el.markup}
            />
          );
        })}
      </CatalogViews.CategoryMarkup>
    </React.Fragment>
  );
};

export default React.memo(CategoryMarkup);
