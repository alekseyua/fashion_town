import React, { useState } from 'react';
import CatalogViews from '../../Views/CatalogViews';
import { FetcherList, dataStates } from '@garpix/fetcher';
import { GxForm, GxSpinner, GxButton } from '@garpix/garpix-web-components-react';
import Button from '../../Views/Button';
import Text from '../../components/Text';
import InformationViews from '../../Views/InformationViews';
import CheckBoxFilters from '../../components/Catalog/CheckBoxFilters';
import EnabledFilters from '../../components/Catalog/EnabledFilters';
import AsyncComponent from '../../components/AsyncComponent';
import { Formik } from 'formik';
import MyShop from '../../Views/MyShopViews';
import Card from './Card';
import CategoryMarkup from './CategoryMarkup';
import PageResolve from './PageResolve';
import { SHOP_PAGE } from '../../const';
import qs from 'querystring';
import api from '../../api';

const AsyncBrandsFilters = AsyncComponent(() => {
  return import('../../components/Catalog/BrandsFilters');
});

const AsynSizesFilters = AsyncComponent(() => {
  return import('../../components/Catalog/SizesFilters');
});

const AsynColorsFilters = AsyncComponent(() => {
  return import('../../components/Catalog/ColorsFilters');
});

const contentApi = api.contentApi;

const options = [
  { title: 'Сначала дешевые', value: 'price' },
  { title: 'Сначала дорогие', value: '-price' },
  { title: 'Популярные', value: '-created_at' },
];
const ShopAllProductComponent = ({ multy_choise_filters, role, location }) => {
  const [isShowBtnSubmit, setIsShowBtnSubmit] = useState(false);
  const [offsetTopBtnSubmit, setOffsetTopBtnSubmit] = useState(0);
  const [brands, setBrands] = useState(multy_choise_filters.by_brand);
  const [colors, setColors] = useState(multy_choise_filters.by_color);
  const [sizes, setSizes] = useState(multy_choise_filters.by_size);
  const [state, setstate] = useState({
    selected_all: false,
    isUpdate: false,
  });
  const pageType = qs.parse(location.search).rout;

  const getInitDataFilters = (data) => {
    if (Array.isArray(data)) {
      return data;
    } else if (data === undefined) {
      return [];
    } else {
      return [data];
    }
  };

  const openBtnSubmit = (e) => {
    if (e.target?.offsetParent?.offsetTop) {
      setOffsetTopBtnSubmit(e.target.offsetParent.offsetTop);
      setIsShowBtnSubmit(true);
    }
  };

  const selectedAllHandler = (selected_all) => {
    setstate({
      ...state,
      selected_all: selected_all,
    });
  };

  const deleteFromMyProducts = (data, callback) => {
    contentApi.deleteFromMyCatalog(data).then((res) => {
      callback();
    });
  };

  const addProduct = (data, callback) => {
    if (!data.length) return false;
    contentApi.addProdutInShop(data).then((res) => {
      callback();
    });
  };

  return (
    <>
      <FetcherList
        isScrollTop={true}
        api={
          String(pageType).toUpperCase() !== SHOP_PAGE.ALL_PRODUCTS && pageType
            ? contentApi.getMyProducFromMyShop
            : contentApi.getShopAllProdut
        }
      >
        {(data) => {
          const {
            count,
            activePage,
            loadData,
            showMore,
            status,
            filterParams,
            deleteElement,
            updateElement,
            deleteElementByKey,
            updateElementByKey,
            isNext,
            isPrev,
            reload,
          } = data;
          let { results = [] } = data;
          const initialValues = {
            brands: getInitDataFilters(filterParams.brands),
            colors: getInitDataFilters(filterParams.colors),
            sizes: getInitDataFilters(filterParams.sizes),
          };
          const onSelectedPhoto = (id, selected) => {
            updateElementByKey(
              {
                selected,
              },
              id,
            );
          };

          const updateMyPrice = (id, price) => {
            updateElementByKey(
              {
                your_price: price,
              },
              id,
            );
          };

          const quicUpdateMyPrice = (id, price) => {
            contentApi.updateMyProductFromMyShop(id, { price }).then((res) => {
              updateMyPrice(id, price);
            });
          };

          const resetContextFilter = (key = '', id) => {
            if (!Array.isArray(initialValues[key])) {
              initialValues[key] = [initialValues[key]];
            }
            loadData(1, {
              ...filterParams,
              [key]: initialValues[key].filter((el) => el !== id),
            });
          };

          const resetAllFilters = () => {
            loadData(1, {
              ...filterParams,
              brands: [],
              colors: [],
              sizes: [],
            });
          };

          const isFilters = (filtersValues, resetAllFilters) => {
            const { brands, colors, sizes } = filtersValues;
            if (brands.length || colors.length || sizes.length) {
              const title = <Text text={'clear.all'} />;
              return (
                <CatalogViews.ClearAllFilters
                  onClick={resetAllFilters}
                  title={title}
                  isLabel={false}
                />
              );
            } else {
              return null;
            }
          };

          if (state.selected_all) {
            results = results.map((el) => {
              return {
                ...el,
                selected: true,
              };
            });
          }
          return (
            <PageResolve
              loadData={loadData}
              filterParams={filterParams}
              initPage={filterParams.rout}
            >
              {({ page, setPage }) => {
                return (
                  <React.Fragment>
                    <MyShop.ClientBase.AboveTable
                      header={page === SHOP_PAGE.ALL_PRODUCTS ? 'Основной каталог' : 'Мой каталог'}
                      infoText={
                        page === SHOP_PAGE.ALL_PRODUCTS
                          ? 'Выберите те товары, которые вы хотите добавить на свой сайт. Затем нажмите кнопку' +
                            '“Добаить в свой каталог” для экспорта товаров. Также Вы можете сохранить любой товар' +
                            'в избранное (при этом товар не будет добавлен в Ваш каталог).'
                          : ''
                      }
                      search="Поиск по товарам"
                      onChangeSelect={(seleted) => {
                        return loadData(1, {
                          ...filterParams,
                          ordering: seleted,
                        });
                      }}
                    >
                      {options.map((el) => {
                        return (
                          <MyShop.ClientBase.MenuItem
                            key={el.value}
                            value={el.value}
                            title={el.title}
                          />
                        );
                      })}
                    </MyShop.ClientBase.AboveTable>
                    <CatalogViews.Tags>
                      <EnabledFilters
                        enabledFilterData={initialValues.brands}
                        defaultFilterData={brands}
                        translateKey={'brand'}
                        resetContextFilter={resetContextFilter}
                        keyFilter={'brands'}
                      />
                      <EnabledFilters
                        enabledFilterData={initialValues.colors}
                        defaultFilterData={colors}
                        translateKey={'color'}
                        resetContextFilter={resetContextFilter}
                        keyFilter={'colors'}
                      />
                      <EnabledFilters
                        enabledFilterData={initialValues.sizes}
                        defaultFilterData={sizes}
                        translateKey={'size'}
                        resetContextFilter={resetContextFilter}
                        keyFilter={'sizes'}
                      />
                      {isFilters(initialValues, resetAllFilters)}
                    </CatalogViews.Tags>

                    <MyShop.AllProduct.Container nameOfStyle={'cabinet_market__row'}>
                      <MyShop.AllProduct.Container nameOfStyle={'cabinet_market__leftcol'}>
                        <MyShop.AllProduct.AddToOwnCatalog
                          selectedAllHandler={selectedAllHandler}
                          selected_all={state.selected_all}
                          results={results}
                          reload={reload}
                          filterParams={filterParams}
                          addProduct={addProduct}
                          deleteFromMyProducts={deleteFromMyProducts}
                          page={page}
                        />

                        {results.map((el) => {
                          return (
                            <Card
                              key={el.id}
                              id={el.id}
                              image={el.image}
                              newPrice={el.price_for_me}
                              // oldPrice={el.recommended_price}
                              price={el.recommended_price}
                              your_price={el.your_price}
                              checked={el.selected}
                              onSelectedPhoto={onSelectedPhoto}
                              updateMyPrice={updateMyPrice}
                              quicUpdateMyPrice={quicUpdateMyPrice}
                              page={page}
                            />
                          );
                        })}
                        {status === 'loading' && results.length ? (
                          <CatalogViews.SpinnerWrapper>
                            <GxSpinner className="spiner" />
                          </CatalogViews.SpinnerWrapper>
                        ) : null}
                        {results.length === count ? null : (
                          <InformationViews.ShowMoreBtn
                            onClick={showMore}
                            allCount={count}
                            currentCount={results.length}
                          />
                        )}

                        {/* По макету текст "показать больше" */}
                      </MyShop.AllProduct.Container>
                      {/* Leftcol end */}
                      <MyShop.AllProduct.Container nameOfStyle={'cabinet_market__rightcol'}>
                        {/*Тут ChoseCatalog сделать как было выше где-то*/}
                        <CategoryMarkup page={page} setPage={setPage} />
                        <Formik
                          enableReinitialize
                          initialValues={initialValues}
                          onSubmit={(data) => {
    
                            loadData(1, {
                              ...filterParams,
                              ...data,
                            });
                          }}
                        >
                          {({ handleSubmit, values, setFieldValue }) => {
                            const paramsForUpdateCardSet = {
                              filterParams,
                              loadData,
                              activePage,
                              initialValues,
                            };

                            const resetAllFilters = () => {
                              loadData(1, {
                                ...filterParams,
                                brands: [],
                                colors: [],
                                sizes: [],
                              });
                            };
                            const resetContextFilter = (key = '', id) => {
                              if (!Array.isArray(initialValues[key])) {
                                initialValues[key] = [initialValues[key]];
                              }
                              loadData(1, {
                                ...filterParams,
                                [key]: initialValues[key].filter((el) => el !== id),
                              });
                            };
                            return (
                              <GxForm novalidate onGx-submit={handleSubmit}>
                                <CatalogViews.SubmitButton
                                  floatRigth
                                  isShowBtnSubmit={isShowBtnSubmit}
                                  offsetTop={offsetTopBtnSubmit}
                                  onClick={() => {
                                    setOffsetTopBtnSubmit(-1000);
                                    handleSubmit();
                                  }}
                                />
                                <CheckBoxFilters role={role} {...paramsForUpdateCardSet} />
                                <AsyncBrandsFilters
                                  role={role}
                                  brands={brands}
                                  values={values}
                                  setFieldValue={setFieldValue}
                                  openBtnSubmit={openBtnSubmit}
                                  {...paramsForUpdateCardSet}
                                />
                                <AsynColorsFilters
                                  colors={colors}
                                  values={values}
                                  setFieldValue={setFieldValue}
                                  openBtnSubmit={openBtnSubmit}
                                  {...paramsForUpdateCardSet}
                                />
                                <AsynSizesFilters
                                  sizes={sizes}
                                  values={values}
                                  setFieldValue={setFieldValue}
                                  openBtnSubmit={openBtnSubmit}
                                  {...paramsForUpdateCardSet}
                                />
                                <CatalogViews.Wrapper mobBtns={true}>
                                  <Button
                                    onClick={resetAllFilters}
                                    variant={'catalog_mobile__clear'}
                                  >
                                    <Text text={'reset.all'} />
                                  </Button>
                                  <Button onClick={handleSubmit} variant={'catalog_mobile__apply'}>
                                    <Text text={'apply'} />
                                  </Button>
                                </CatalogViews.Wrapper>
                              </GxForm>
                            );
                          }}
                        </Formik>
                      </MyShop.AllProduct.Container>
                      {/* Rightcol end */}
                    </MyShop.AllProduct.Container>
                  </React.Fragment>
                );
              }}
            </PageResolve>
          );
        }}
      </FetcherList>
    </>
  );
};

export default React.memo(ShopAllProductComponent);
