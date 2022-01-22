import React from 'react';
import { GxButton } from '@garpix/garpix-web-components-react';
import style from '../index.module.scss';
import Button from '../../Button';
import Text from '../../../components/Text';
import { SHOP_PAGE } from '../../../const';
import classNames from 'classnames';

const ChoseCatalog = ({ nameOfStyle, setPage, page, ...props }) => {
  return (
    <div className={style[nameOfStyle]}>
      <GxButton
        full
        onClick={(e) => {
          setPage(SHOP_PAGE.ALL_PRODUCTS);
        }}
        className={classNames({
          [style['cabinet_market__catlink']]: true,
          [style['cabinet_market__catlink-active']]: page === SHOP_PAGE.ALL_PRODUCTS,
        })}
      >
        Основной каталог
      </GxButton>
      <GxButton
        full
        onClick={(e) => {
          setPage(SHOP_PAGE.MY_PRODUCTS);
        }}
        className={classNames({
          [style['cabinet_market__catlink']]: true,
          [style['cabinet_market__catlink-active']]: page !== SHOP_PAGE.ALL_PRODUCTS,
        })}
      >
        Мой каталог
      </GxButton>
      {nameOfStyle === 'cabinet_market__catlink_wrapper-mobile' && (
        <>
          {/* Кнопка ниже такая же, как в каталоге на мобилах */}
          <Button
            full
            // onClick={() => setshowFilters(!showFilters)}
            // variant={!showFilters ? 'catalog_mobile__filter' : 'catalog_mobile__filter-closed'}
            // iconRight={showFilters && closeJustIcon}
          >
            <Text text={'filters'} />
            {/* Фильтры */}
          </Button>{' '}
        </>
      )}
    </div>
  );
};

export default React.memo(ChoseCatalog);
