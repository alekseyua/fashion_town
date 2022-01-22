import React, { useState, useEffect } from 'react';
import Button from '../../Views/Button';
import MyShop from '../../Views/MyShopViews';
import { FetcherList } from '@garpix/fetcher';
import api from '../../api';
import qs from 'qs';

const contentApi = api.contentApi;

const ContentLivePhotosShopComponent = ({ location, content }) => {
  const [brands, setbrands] = useState([]);
  const initialFilters = { page_size: 15, ...qs.parse(location.search) };

  const updateAlbumAndPhoto = (data, success = () => {}) => {
    contentApi.updateShopLivePhoto(data).then((res) => {
      success();
    });
  };

  useEffect(() => {
    contentApi
      .getBrands({ is_life_photos: true })
      .then((res) => {
        res.unshift({
          title: `Все бренды`,
          value: null,
        });
        setbrands(res);
      })
      .catch((err) => {});
  }, []);
  return (
    <FetcherList initFilter={initialFilters} isScrollTop={false} api={contentApi.getShopLivePhoto}>
      {(data) => {
        const {
          count,
          activePage,
          results = [],
          loadData,
          showMore,
          status,
          filterParams,
          deleteElement,
          updateElement,
          updateElementByKey,
          isNext,
          isPrev,
          reload,
        } = data;
        const updateAlbum = (data) => {
          updateAlbumAndPhoto([data], reload);
        };
        const updatePhotoCard = (data) => {
          updateAlbumAndPhoto([data]);
        };
        return (
          <MyShop.Settings.WrapperSection>
            <MyShop.Settings.Head>Контент {'>'} Живые фото</MyShop.Settings.Head>
            {content ? (
              <MyShop.Settings.TabInfo>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
              </MyShop.Settings.TabInfo>
            ) : null}
            <MyShop.Settings.SectionContent>
              <MyShop.Settings.FiltersBrandAndDate
                brands={brands}
                filterParams={filterParams}
                loadData={loadData}
              />
              <MyShop.Settings.SectionContent>
                <MyShop.Settings.TabWrapper scroll>
                  {results.map((el, i) => {
                    return (
                      <MyShop.Settings.AlbumItem
                        key={`${el.id}-${i}`}
                        updateAlbum={updateAlbum}
                        updatePhotoCard={updatePhotoCard}
                        {...el}
                      />
                    );
                  })}
                </MyShop.Settings.TabWrapper>
                <MyShop.Settings.WrapperButtonSave>
                  <Button
                    type={'submit'}
                    variant={'cabinet_default'}
                    className="cabinet_myshop__tab_btn"
                  >
                    применить
                  </Button>
                </MyShop.Settings.WrapperButtonSave>
              </MyShop.Settings.SectionContent>
            </MyShop.Settings.SectionContent>
          </MyShop.Settings.WrapperSection>
        );
      }}
    </FetcherList>
  );
};

export default React.memo(ContentLivePhotosShopComponent);
