import React, { useEffect, useState } from 'react';
import { FetcherList, dataStates } from '@garpix/fetcher';
import { defaultImageCard } from '../../images/index';
import ProductsInStockLayout from '../../Views/ProductsInStockLayout';
import { GxSpinner } from '@garpix/garpix-web-components-react';
import ProductCard from '../../components/ProductCard';
import CatalogViews from '../../Views/CatalogViews'
import api from '../../api';
import { useStoreon } from 'storeon/react';

const apiContent = api.contentApi;
const ProductsInStock = ({
  profile,
  products,
  catalog_url,
  setModalStates,
  in_stock_product_filters = [],
}) => {
  const { currenssies } = useStoreon('currenssies'); //currenssies
  const [filterList, setFilterList] = useState(in_stock_product_filters);
  const [initialFilters, setInitialFilters] = useState({
    page_size: 12,
    is_in_stock: true,
    categories: in_stock_product_filters[0] ? in_stock_product_filters[0].id : null,
  });
  const defaultImages = [defaultImageCard];

  useEffect(() => {
    if (in_stock_product_filters.length) {
      in_stock_product_filters.map((el) => {
        if (el.active) {
          setInitialFilters({
            ...initialFilters,
            categories: el.id,
          });
        }
      });
    }
  }, []);

  return (
    <FetcherList
      isScrollTop={false}
      isHistoryPush={false}
      initFilter={initialFilters}
      api={apiContent.getCatalogData}
    >
      {(data) => {
        const {
          count,
          results = [],
          activePage,
          loadData,
          showMore,
          status,
          filterParams = initialFilters,
          deleteElement,
          updateElement,
          deleteElementByKey,
          updateElementByKey,
          isNext,
          isPrev,
        } = data;
        return (
          <ProductsInStockLayout
            activePage={activePage}
            initialFilters={filterParams}
            loadData={loadData}
            filterList={filterList}
            setFilterList={setFilterList}
            catalog_url={catalog_url}
          >
            {status === 'loading' ? (
              <CatalogViews.SpinnerWrapper>
                <GxSpinner className="spiner" />
              </CatalogViews.SpinnerWrapper>
            ) : (
              results.map((el, key) => {
    // Component -> ProductsInStock
                return (
                  <ProductCard 
                    key={el.id}
                    url={el.url}
                    id={el.id}
                    title={el.title}
                    brand={el.brand}
                    prices={el.prices}
                    stock={el.stock}
                    images={el.images.length ? el.images : defaultImages}
                    colors={el.colors}
                    isSales={el.isSales}
                    isNew={el.isNew}
                    isHit={el.isHit}
                    favorite={el.favorite}
                    sizes={el.sizes}
                    product_rc={el.product_rc}
                  />
                );
              })
            )}
          </ProductsInStockLayout>
        );
      }}
    </FetcherList>
  );
};

export default React.memo(ProductsInStock);
