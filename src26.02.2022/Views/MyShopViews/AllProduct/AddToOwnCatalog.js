import React from 'react';
import style from '../index.module.scss';
import CheckBox from '../../CheckBox';
import Button from '../../Button';
import { getSelectedPhotoId } from '../../../utils/serializers';
import { SHOP_PAGE } from '../../../const';

const AddToOwnCatalog = ({
  selectedAllHandler,
  selected_all,
  results,
  addProduct,
  deleteFromMyProducts,
  reload,
  filterParams,
  page,
}) => {
  const data = getSelectedPhotoId(results);
  return (
    <div className={style['cabinet_market__add_wrapper']}>
      <CheckBox
        checked={selected_all}
        onGx-change={(e) => {
          selectedAllHandler(e.target.checked);
          return false;
        }}
        label="Выделить все"
      />
      {SHOP_PAGE.ALL_PRODUCTS === page ? (
        <Button
          disabled={!data.length}
          onClick={(e) => {
            const paramsData = data.map((el) => {
              return {
                product_id: el.id,
                price: Number(el.your_price),
              };
            });
            const callback = () => {
              return reload()
            };
            addProduct(paramsData, callback);
          }}
          variant={'cabinet_default'}
        >
          + в свой каталог
        </Button>
      ) : (
        <Button
          disabled={!data.length}
          onClick={(e) => {
            const callback = () => {
              return reload();
            };
            if (SHOP_PAGE.ALL_PRODUCTS === page) {
              const paramsData = data.map((el) => {
                return {
                  product_id: el.id,
                  price: Number(el.your_price),
                };
              });
              addProduct(paramsData, callback);
            } else {
              const fd = new FormData();
              const paramsData = data.map((el) => {
                return el.id;
              });
              deleteFromMyProducts(
                {
                  product_id: paramsData,
                },
                callback,
              );
            }
          }}
          variant={'cabinet_default'}
        >
          Удалить
        </Button>
      )}
    </div>
  );
};

export default React.memo(AddToOwnCatalog);
