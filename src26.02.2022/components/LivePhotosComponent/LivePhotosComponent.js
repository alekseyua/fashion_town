import React, { useEffect, useState } from 'react';
import { FetcherList, dataStates } from '@garpix/fetcher';
import LivePhotosCard from '../../Views/LivePhotosCard';
import Text from '../Text';
import TextUnderTitle from '../../Views/TextUnderTitle';
import Pagination from '../../Views/Pagination';
import LivePhotosViews from '../../Views/LivePhotosViews';
import Breadcrumbs from '../../Views/Breadcrumbs';
import Title from '../../Views/Title';
import api from '../../api';
import { useIntl } from 'react-intl';
import qs from 'qs';

const apiContent = api.contentApi;

const LivePhotosComponent = ({ titlePage = 'Живые фото', location, breadcrumbs }) => {
  const [brands, setbrands] = useState([]);
  const { locale } = useIntl();

  const initialFilters = { page_size: 15, ...qs.parse(location.search) };
  useEffect(() => {
    apiContent
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
    <LivePhotosViews.Wrapper>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Title variant={'page__news'} type={'h1'}>
        {titlePage}
      </Title>
      <TextUnderTitle variant={'live_photos-text'}>
        В этом разделе вы найдете обзоры с фирм-производителей, товары которых мы реализуем. По фото
        вы сможете оценить, как тот или иной товар выглядит вживую, а не на постановочных
        фотографиях. И что-то тут еще про то, как найти товар в каталоге, когда решим, как делаем.
      </TextUnderTitle>

      <FetcherList isScrollTop={true} initFilter={initialFilters} api={apiContent.getLivePhotos}>
        {(data) => {
          const {
            count,
            results = [],
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
          } = data;
          return (
            <>
              <LivePhotosViews.Filters
                filterParams={filterParams}
                loadData={loadData}
                brands={brands}
              />
              <LivePhotosViews.NewsContainer>
                {results.lendth === 0 ? <p>Ничего не найдено!</p> : null}
                {results.map((el, i) => {
                  return (
                    <LivePhotosCard
                      key={el.id}
                      slug={el.slug}
                      brand={el.brand.title}
                      date={el.created_at}
                      image={el.image}
                    />
                  );
                })}
              </LivePhotosViews.NewsContainer>
              <Pagination activePage={activePage} count={count} params={filterParams} />
            </>
          );
        }}
      </FetcherList>
    </LivePhotosViews.Wrapper>
  );
};

export default React.memo(LivePhotosComponent);
