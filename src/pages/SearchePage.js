import React from 'react';
import Layout from '../Views';
import Breadcrumbs from '../Views/Breadcrumbs';
import CatalogViews from '../Views/CatalogViews';
import api from '../api';
import { FetcherList } from '@garpix/fetcher';
import AsyncComponent from '../components/AsyncComponent';
import ListOfProductsAfterSearch from '../Views/ListOfProductsAfterSearch';
import { GxButton } from '@garpix/garpix-web-components-react';
import { GxSpinner } from '@garpix/garpix-web-components-react';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import Text from '../../src/components/Text';
import Pagination from '../Views/Pagination';
import Button from '../Views/Button';
import Modal from '../Views/ModalCreator';


const apiSearch = api.getMoreThanFiveProductsOfSearch;

const AsyncProductCard = AsyncComponent(() => {
  return import('../components/ProductCard');
});

const SearchePage = (props) => {
 

  const sklonenie = (number, txt, cases = [2, 0, 1, 1, 1, 2]) =>
    txt[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];

  const initialFilters = { page_size: 15, ...qs.parse(props.location.search) };

  return (
    <Layout {...props}>
      <Modal.StorControllerModal />
      <FetcherList isScrollTop={false} api={apiSearch}>
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
            profile,
          } = data;
          return (
            <>
              {status === 'loading' || filterParams.q === undefined ? (
                <CatalogViews.SpinnerWrapper>
                  <GxSpinner className="spiner" />
                </CatalogViews.SpinnerWrapper>
              ) : (
                <ListOfProductsAfterSearch.Container>
                  <Breadcrumbs breadcrumbs={props.breadcrumbs} />
                  {results.length > 0 ? (
                    <>
                      <ListOfProductsAfterSearch.HeaderOfSearch
                        text={`Показан результат для «${filterParams.q}»`}
                      />
                      <ListOfProductsAfterSearch.InfoOfSearch
                        count={results.length}
                        product={sklonenie(results.length, ['товар', 'товара', 'товаров'])}
                      />
                      <CatalogViews.WrapperCard>
                        {results.map((el) => {
                          return (
                            <AsyncProductCard
                              url={el.url}
                              key={el.id}
                              title={el.title}
                              id={el.id}
                              brand={el.brand}
                              favorite={el.favorite}
                              prices={el.prices}
                              stock={el.stock}
                              colors={el.colors}
                              images={el.images}
                              isSales={el.isSales}
                              isNew={el.isNew}
                              isHit={el.isHit}
                              sizes={el.sizes}
                              product_rc={el.product_rc}
                              profile={profile}
                            />
                          );
                        })}
                      </CatalogViews.WrapperCard>
                      {isNext ? (
                        <Button full onClick={showMore} variant={'show_more'}>
                          <Text text={'show.more'} />
                        </Button>
                      ) : null}

                      <Pagination
                        addClass={'left'}
                        activePage={activePage}
                        count={count}
                        params={filterParams}
                      />
                    </>
                  ) : (
                    <>
                      <ListOfProductsAfterSearch.HeaderOfSearch
                        text={'По данному запросу ничего не найдено'}
                      />
                      <Link to={{ pathname: props.site_configuration.page_type_catalog }}>
                        <GxButton className="cabinet_myshop__section_btn cabinet_myshop__section_btn-back btn">
                          {'<'} назад
                        </GxButton>
                      </Link>
                    </>
                  )}
                </ListOfProductsAfterSearch.Container>
              )}
            </>
          );
        }}
      </FetcherList>
    </Layout>
  );
};

export default React.memo(SearchePage);
