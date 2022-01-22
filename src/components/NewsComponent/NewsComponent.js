import React, { useEffect, useState } from 'react';
import { FetcherList, dataStates } from '@garpix/fetcher';
import NewsCard from '../../Views/NewsCard';
import Text from '../Text';
import Pagination from '../../Views/Pagination';
import NewViews from '../../Views/NewsViews';
import Breadcrumbs from '../../Views/Breadcrumbs';
import Title from '../../Views/Title';
import api from '../../api';

const apiContent = api.contentApi;
const NewsComponent = ({ titlePage = 'новости', rubrics }) => {
  const tempBreadCrumbs = [
    {
      link: '/',
      title: 'Главная',
    },
    {
      link: 'news',
      title: 'Новости',
    },
  ];
  const initialFilters = { page_size: 20, rubrics: null };
  return (
    <NewViews.Wrapper>
      <Breadcrumbs breadcrumbs={tempBreadCrumbs} />
      <Title variant={'page__news'} type={'h1'}>
        новости
      </Title>
      <FetcherList isScrollTop={true} initFilter={initialFilters} api={apiContent.getNews}>
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
            <>
              <NewViews.Tags
                rubrics={rubrics}
                filterParams={filterParams}
                loadData={loadData}
                activePage={activePage}
              />
              <NewViews.NewsContainer>
                {results.map((el, i) => {
                  return (
                    <NewsCard
                      key={el.id + i}
                      img={el.image}
                      title={el.title}
                      date={el.created_at}
                      description={el.description}
                      url={el.url}
                    />
                  );
                })}
              </NewViews.NewsContainer>
              <NewViews.PaginationContainer>
                <Pagination activePage={activePage} count={count} params={filterParams} />
              </NewViews.PaginationContainer>
            </>
          );
        }}
      </FetcherList>
    </NewViews.Wrapper>
  );
};

export default React.memo(NewsComponent);
