import React, { useState, useEffect } from 'react';
import Title from '../../Views/Title';
import ExportCatalogViews from '../../Views/ExportCatalogViews';
import CatalogViews from '../../Views/CatalogViews';
import CheckBoxFilters from '../Catalog/CheckBoxFilters';
import Button from '../../Views/Button';
import EnabledFilters from '../Catalog/EnabledFilters';
import api from '../../api';
import Text from '../Text';
import qs from 'query-string';
import { FetcherList } from '@garpix/fetcher';
import { GxForm, GxSpinner } from '@garpix/garpix-web-components-react';
import { closeJustIcon } from '../../images';
import { Formik } from 'formik';
import AsyncComponent from '../../components/AsyncComponent';
import WarningBlock from '../../Views/ModalContentViews/WarningBlock';

const AsyncBrandsFilters = AsyncComponent(() => {
  return import('../Catalog/BrandsFilters');
});

const AsynSizesFilters = AsyncComponent(() => {
  return import('../Catalog/SizesFilters');
});

const AsynColorsFilters = AsyncComponent(() => {
  return import('../Catalog/ColorsFilters');
});

const apiCatalog = api.contentApi;

const ExportCatalogComponents = ({ role, multy_choise_filters }) => {
  const options = [
    { title: 'Сначала дешевые', value: 'price' },
    { title: 'Сначала дорогие', value: '-price' },
    { title: 'Популярные', value: '-created_at' },
  ];
  const [state, setstate] = useState({
    selected_all: false,
    isUpdate: false,
  });
  const [offsetTopBtnSubmit, setOffsetTopBtnSubmit] = useState(0);
  const [showFilters, setshowFilters] = useState(false);
  const [isShowBtnSubmit, setIsShowBtnSubmit] = useState(false);
  const [brands, setBrands] = useState(multy_choise_filters.by_brand);
  const [colors, setColors] = useState(multy_choise_filters.by_color);
  const [sizes, setSizes] = useState(multy_choise_filters.by_size);

  const openBtnSubmit = (e) => {
    if (e.target?.offsetParent?.offsetTop) {
      setOffsetTopBtnSubmit(e.target.offsetParent.offsetTop);
      setIsShowBtnSubmit(true);
    }
  };

  const downloadSelectedPhoto = (photos = []) => {
    apiCatalog
      .getArchivePhotosFromExportCatalog({
        photos,
      })
      .then((res) => {
        window.location.href = res.url;
      });
  };

  const isFilters = (filtersValues, resetAllFilters) => {
    const { brands, colors, sizes } = filtersValues;
    if (brands.length || colors.length || sizes.length) {
      const title = <Text text={'clear.all'} />;
      return (
        <CatalogViews.ClearAllFilters onClick={resetAllFilters} title={title} isLabel={false} />
      );
    } else {
      return null;
    }
  };
  const selectedAllHandler = (selected_all, reload) => {
    setstate({
      ...state,
      selected_all: selected_all,
    });
    reload();
  };
  return (
    <FetcherList
      initFilter={{ page_size: 40 }}
      isScrollTop={false}
      api={apiCatalog.getPhotosListForExportCatalog}
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
        const onSelectedPhoto = (id, selected) => {
          updateElementByKey(
            {
              selected,
            },
            id,
          );
        };
        if (state.selected_all) {
          results = results.map((el) => {
            return {
              ...el,
              selected: true,
            };
          });
        }
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

        const resetAllFilters = () => {
          loadData(1, {
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
            ...initialValues,
            [key]: initialValues[key].filter((el) => el !== id),
          });
        };
        return (
          <React.Fragment>
            <CatalogViews.Row>
              <CatalogViews.Catalog>
                <Title variant={'catalog-heading'} type={'h1'}>
                  Скачать фото
                </Title>
                <WarningBlock variant={'warning_wrapper__grid-texta2'} wrapVariant={'nomargin'}>
                  Подсказка для дропшипперов, что у них действует ограничение на скачивание, если
                  нет созданного и-м
                </WarningBlock>
              </CatalogViews.Catalog>
            </CatalogViews.Row>
            <CatalogViews.Row variant={'nomargin'}>
              <CatalogViews.Filters>
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
                        ...data,
                        colors : "1",
                      });
                    }}
                  >
                    {({ handleSubmit, values, setFieldValue }) => {
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
                            <Button onClick={resetAllFilters} variant={'catalog_mobile__clear'}>
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
                </CatalogViews.Wrapper>
              </CatalogViews.Filters>
              <CatalogViews.Catalog>
                <ExportCatalogViews.Sort
                  options={options}
                  selectedSortFilters={(seleted) => {
                    return setstate({
                      ...state,
                      ordering: seleted,
                    });
                  }}
                  count={count}
                />
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
                <ExportCatalogViews.SelectedAndDownload
                  selectedAllHandler={selectedAllHandler}
                  reload={reload}
                  selected_all={state.selected_all}
                  results={results}
                  downloadSelectedPhoto={downloadSelectedPhoto}
                />
                <ExportCatalogViews.WrapperCard>
                  {status === 'loading' && !results.length ? (
                    <CatalogViews.SpinnerWrapper>
                      <GxSpinner className="spiner" />
                    </CatalogViews.SpinnerWrapper>
                  ) : null}
                  {results.map((el, i) => {
                    return (
                      <ExportCatalogViews.Card
                        key={el.id}
                        {...el}
                        onSelectedPhoto={onSelectedPhoto}
                      />
                    );
                  })}
                  {status === 'loading' && results.length ? (
                    <CatalogViews.SpinnerWrapper>
                      <GxSpinner className="spiner" />
                    </CatalogViews.SpinnerWrapper>
                  ) : null}
                </ExportCatalogViews.WrapperCard>
                {isNext ? (
                  <Button full onClick={showMore} variant={'show_more'}>
                    <Text text={'show.more'} />
                  </Button>
                ) : null}
                <ExportCatalogViews.Bottom />
              </CatalogViews.Catalog>
            </CatalogViews.Row>
          </React.Fragment>
        );
      }}
    </FetcherList>
  );
};

export default React.memo(ExportCatalogComponents);
