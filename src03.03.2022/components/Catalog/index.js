import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../Views/Breadcrumbs';
import CatalogViews from '../../Views/CatalogViews';
import Container from '../../Views/Container';
import WarningBlock from '../../Views/WarningBlock';
import CheckBoxFilters from './CheckBoxFilters';
import Button from '../../Views/Button';
import Categories from './Categories';
import EnabledFilters from './EnabledFilters';
import EnabledFiltersOptions from './EnabledFiltersOptions';
import api from '../../api';
import Text from '../Text';
import Pagination from '../../Views/Pagination';
import Title from '../../Views/Title';
import {ROLE} from '../../const';
import qs from 'query-string';
import { FetcherList } from '@garpix/fetcher';
import { GxForm, GxSpinner } from '@garpix/garpix-web-components-react';
import { productCard1, productCard2, productCard3, closeJustIcon } from '../../images';
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
import { deepSerche } from './utils';
import { useStoreon } from 'storeon/react';
import AsyncComponent from '../../components/AsyncComponent';
import Offset from '../../Views/Offset';
import UserApi from '../../api/UserApi';

const apiContent = api.contentApi;

const AsyncProductCard = AsyncComponent(() => {
  return import('../ProductCard');
});

const AsyncTypeProductFilters = AsyncComponent(() => {
  return import('./TypeProductFilters');
});

const AsyncBrandsFilters = AsyncComponent(() => {
  return import('./BrandsFilters');
});

const AsynSizesFilters = AsyncComponent(() => {
  return import('./SizesFilters');
});

const AsynColorsFilters = AsyncComponent(() => {
  return import('./ColorsFilters');
});

const AsyncYouHaveAlreadyWatched = AsyncComponent(() => {
  return import('../YouHaveAlreadyWatched');
});

const Catalog = ({
  multy_choise_filters,
  categories: CategoriesProps,
  location,
  content,
  breadcrumbs,
  // role_configuration,
  //profile,
}) => {

  const { userPage } = useStoreon('userPage');
  const { profile } = userPage;
  const { role } = profile;

  //*************************************************************** */
  const [newContent, setNewContent] = useState(content)
  useEffect(() => {
    setNewContent(content)
  }, [content])
  //*************************************************************** */
  //*************************************************************** */
  const [newBreadcrumbs, setNewBreadcrumbs] = useState(breadcrumbs)
  useEffect(() => {
    setNewBreadcrumbs(breadcrumbs)
  }, [breadcrumbs])
  //*************************************************************** */
  //*************************************************************** */
  const [newProfile, setNewProfile] = useState(profile)
  useEffect(() => {
    setNewProfile(profile)
  }, [profile])
  //*************************************************************** */



  const { updateCurrenssies } = useStoreon('updateCurrenssies');
  const { updateWish } = useStoreon('updateWish');
  const { currenssies } = useStoreon('currenssies'); //currenssies
  const { stateValuePoly } = useStoreon('stateValuePoly');

  const [offsetTopBtnSubmit, setOffsetTopBtnSubmit] = useState(0);
  const [showFilters, setshowFilters] = useState(false);
  const [isShowBtnSubmit, setIsShowBtnSubmit] = useState(false);
  const [categories, setCategories] = useState([]);
  const defaultImageSet = [productCard1, productCard2, productCard3];
  const [brands, setBrands] = useState([]);
  const [byProductTyoe, setByProductTyoe] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [paramFilterChange, setParamFilterChange] = useState({
    categories: [],
    brands: [],
    colors: [],
    sizes: [],
  })
  const [optionalsFilter, setoptionalsFilter] = useState([
    {
      id: 1,
      title: Text({ text: 'inStock' }),
      type: 'is_in_stock',
      active: false,
    },
    {
      id: 2,
      title: Text({ text: 'newItems' }),
      type: 'is_new',
      active: false,
    },
    {
      id: 3,
      title: Text({ text: 'hits' }),
      type: 'is_bestseller',
      active: false,
    },
    {
      id: 4,
      title: Text({ text: 'sell.out' }),
      type: 'is_closeout',
      active: false,
    },
    {
      id: 4,
      title: Text({ text: 'assembled' }),
      type: 'is_in_collection',
      active: false,
    },
    {
      id: 4,
      title: Text({ text: 'not.in.rows' }),
      type: 'is_not_range',
      active: false,
    },
  ]);
  const { locale } = useIntl();

  const options = [
    { title: 'Сначала дешевые', value: 'price' },
    { title: 'Сначала дорогие', value: '-price' },
    { title: 'Популярные', value: '-created_at' },
  ];

  const checkIsShowCategorysAndProducType = () => {
    const queryStrin = qs.parse(location.search);
    if (queryStrin?.category?.length) {
      return false;
    } else {
      return true;
    }
  };

  const openBtnSubmit = (e) => {
    if (e.target?.offsetParent?.offsetTop) {
      // 
      //заганяем координаты появления кнопки для применения фильтра
      setOffsetTopBtnSubmit(e.target.offsetParent.offsetTop);
      setIsShowBtnSubmit(true);
    }
  };

  const isFilters = (filtersValues, resetAllFilters) => {
    const {
      categories = [],
      brands = [],
      colors = [],
      sizes = [],
      is_bestseller,
      is_closeout,
      is_in_stock,
      is_new,
      is_not_range,
      is_in_collection,
    } = filtersValues;
    if (
      categories.length ||
      brands.length ||
      colors.length ||
      sizes.length ||
      is_bestseller ||
      is_closeout ||
      is_in_stock ||
      is_new ||
      is_not_range ||
      is_in_collection
    ) {
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

  const getTitleForDocument = (filterParams) => {
    const { category = false } = filterParams;
    if (!category) return <Text text={'catalog'} />;
    return deepSerche(Number(category), categories);
  };

  //!hide button submit кнопка применения фильтрации
  useEffect(() => {
    let timeOutHideBtnSubmit = setTimeout(() => {
      setIsShowBtnSubmit(false);
      clearTimeout(timeOutHideBtnSubmit);
    }, 4000);
    return () => {
      clearTimeout(timeOutHideBtnSubmit);
    };
  }, [isShowBtnSubmit]);

  useEffect(() => {
    setCategories(CategoriesProps);
    setByProductTyoe(multy_choise_filters.by_type);
    setBrands(multy_choise_filters.by_brand);
    setColors(multy_choise_filters.by_color);
    setSizes(multy_choise_filters.by_size);
  }, [
    multy_choise_filters.by_type,
    multy_choise_filters.by_brand,
    multy_choise_filters.by_color,
    multy_choise_filters.by_size,
  ]);

  // *****************************************************   
  const [dataUpdateCatalog, setDataUpdateCatalog] = useState(false);
  useEffect(() => {
    setDataUpdateCatalog(true)
  }, [updateCurrenssies])

  return (
    <React.Fragment>
      <Container>
        <Breadcrumbs breadcrumbs={newBreadcrumbs} />
        <FetcherList
          initFilter={{ page_size: 30 }}
          isScrollTop={true}
          api={apiContent.getCatalogData}
          profile={newProfile}
        >
          {(data) => {

            const {
              count,
              results = [],
              activePage,
              loadData,
              showMore,
              status,
              filterParams,
              isNext,
            } = data;

            //reload
            // *****************************************************
            const executeUpdate = () => {

              setDataUpdateCatalog(false);
              data?.reload();
            }
            dataUpdateCatalog ? executeUpdate() : null;
            // *****************************************************

            // добавляем удаляем данные в фильтре
            const getInitDataFilters = (data) => {
              if (Array.isArray(data)) {
                return data;
              } else if (data === undefined) {
                return [];
              } else {
                return [data];
              }
            };

            const initialValues = {
              categories: getInitDataFilters(filterParams.categories),
              brands: getInitDataFilters(filterParams.brands),
              colors: getInitDataFilters(filterParams.colors),
              sizes: getInitDataFilters(filterParams.sizes),
            };

            const paramsForUpdateCardSet = {
              filterParams,
              loadData,
              activePage,
              initialValues,
            };


            // сброс всех фильтров
            const resetAllFilters = () => {
              loadData(1, {
                categories: [],
                brands: [],
                colors: [],
                sizes: [],
              });
            };




            // надпись над каталогом сброс выбраных фильтров
            const resetContextFilter = (key = '', id) => {

              if (!Array.isArray(initialValues[key])) {
                initialValues[key] = [initialValues[key]];
                loadData(1, {
                  categories: [],
                  brands: [],
                  colors: [],
                  sizes: [],
                });
              }
              loadData(1, {
                ...filterParams,
                [key]: initialValues[key].filter((el) => el !== id),
              });
            };

            const resetContextFilterOptions = (key) => {
              loadData(1, {
                ...filterParams,
                [key]: null,
              });
            };

            //***********************************************************************************************
            // console.log('newContent', newContent)




            return (
              <React.Fragment>
                <CatalogViews.Row>
                  <CatalogViews.Catalog>
                    <Title variant={'catalog-heading'} type={'h1'}>
                      {getTitleForDocument(filterParams)}

                    </Title>

                    {/* <WarningBlock
                      variant={'catalog-wrapper-mobile'}
                      // textWarning={<div dangerouslySetInnerHTML={{ __html: newContent }}></div>}
                      textWarning={newContent}

                    /> */}
                  </CatalogViews.Catalog>
                </CatalogViews.Row>
                <CatalogViews.Row>
                  <React.Fragment>
                    <CatalogViews.Filters>
                      {/* <Categories {...paramsForUpdateCardSet} categories={categories} /> */}
                      <Button
                        full
                        onClick={() => setshowFilters(!showFilters)}
                        variant={
                          !showFilters ? 'catalog_mobile__filter' : 'catalog_mobile__filter-closed'
                        }
                        iconRight={showFilters && closeJustIcon}
                      >
                        <Text text={'filters'} />
                        {/* Фильтры */}
                      </Button>
                      {/* По клику должен появиться блок с фильтрами  */}
                      <CatalogViews.Wrapper isShowMobileFilters={showFilters} catfilter={true}>
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
                            //через функцию сохраняем состояние фильтров
                            setParamFilterChange(values)
                            //setColors(values.colors)
                            return (
                              <GxForm novalidate onGx-submit={handleSubmit}>
                                <CatalogViews.SubmitButton
                                  isShowBtnSubmit={isShowBtnSubmit}
                                  offsetTop={offsetTopBtnSubmit}
                                  onClick={() => {
                                    setOffsetTopBtnSubmit(-1000);
                                    handleSubmit();
                                  }}
                                />
                                <CheckBoxFilters role={role} {...paramsForUpdateCardSet} />
                                {checkIsShowCategorysAndProducType() ? (
                                  <AsyncTypeProductFilters
                                    categories={byProductTyoe}
                                    values={values}
                                    handleSubmit={handleSubmit}
                                    setFieldValue={setFieldValue}
                                    openBtnSubmit={openBtnSubmit}
                                    {...paramsForUpdateCardSet}
                                  />
                                ) : null}
                                {role !== ROLE.RETAIL && role !== ROLE.UNREGISTRED ?
                                <AsyncBrandsFilters
                                  role={role}
                                  brands={brands}
                                  values={values}
                                  setFieldValue={setFieldValue}
                                  openBtnSubmit={openBtnSubmit}
                                  {...paramsForUpdateCardSet}
                                />
                                :null}
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
                                  <Button
                                    onClick={() => {
                                      handleSubmit();
                                      setshowFilters(!showFilters);
                                    }}
                                    variant={'catalog_mobile__apply'}
                                  >
                                    <Text text={'apply'} />
                                  </Button>
                                </CatalogViews.Wrapper>
                              </GxForm>
                            );
                          }}
                        </Formik>
                      </CatalogViews.Wrapper>
                    </CatalogViews.Filters>
                    <CatalogViews.Catalog>
                      <WarningBlock
                        variant={'catalog-wrapper'}
                        // textWarning={<div dangerouslySetInnerHTML={{ __html: newContent }}></div>}
                        textWarning={newContent}

                      />
                      <CatalogViews.SortSelect
                        selectedSortFilters={(seleted) => {
                          return loadData(1, {
                            ...filterParams,
                            ordering: seleted,
                          });
                        }}
                        options={options}
                      />
                      {status === 'loading' ? (
                        <CatalogViews.SpinnerWrapper>
                          <GxSpinner className="spiner" />
                        </CatalogViews.SpinnerWrapper>
                      ) : (
                        <>
                          <CatalogViews.Tags>

                            <EnabledFiltersOptions
                              enabledFilterData={filterParams}
                              defaultFilterData={optionalsFilter}
                              translateKey={'options'}
                              resetContextFilter={resetContextFilterOptions}
                              keyFilter={'optionalsFilter'}
                            />
                            <EnabledFilters
                              enabledFilterData={initialValues.categories}
                              defaultFilterData={categories}
                              translateKey={'category'}
                              resetContextFilter={resetContextFilter}
                              keyFilter={'categories'}
                            />
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
                            {isFilters(filterParams, resetAllFilters)}
                          </CatalogViews.Tags>
                          {!results.length ? <CatalogViews.EmptyCatalog /> : null}
                          {/* прорисовывает отфильтрованые элементы */}
                          <CatalogViews.WrapperCard>
                            {results.map((el) => {
                              return (
                                <AsyncProductCard
                                  profile={newProfile}
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
                      )}
                    </CatalogViews.Catalog>
                  </React.Fragment>
                </CatalogViews.Row>
              </React.Fragment>
            );
          }}
        </FetcherList>
      </Container>
      <AsyncYouHaveAlreadyWatched />
      <Offset offset={'catalog'} />
    </React.Fragment>
  );
};

export { Catalog };
