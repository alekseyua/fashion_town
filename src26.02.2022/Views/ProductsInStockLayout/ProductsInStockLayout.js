import React from 'react';
import style from './productsInStock.module.scss';
import MainFilters from '../MainFilters';
import MoreLink from '../MoreLink';
import Text from '../../components/Text';
import Title from '../Title';

const ProductsInStockLayout = ({
  activePage,
  loadData,
  initialFilters,
  children,
  catalog_url = '#',
  filterList,
  setFilterList,
}) => {
  return (
    <div className={style['products-in-stock']}>
      <div className={'container'}>
        <div className={style['products-in-stock-wrap']}>
          <Title type={'h2'} variant={'product__instock-title'}>
            <Text text={'productInStock'} />
          </Title>
          <MainFilters
            activePage={activePage}
            initialFilters={initialFilters}
            loadData={loadData}
            setFilterList={setFilterList}
            filters={filterList}
          />
          <div className={style['products-in-stock-content']}>
            <div className={style['products-in-stock__list']}>{children}</div>
            <MoreLink url={catalog_url}>
              <Text text={'show_all'} />
            </MoreLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductsInStockLayout);
