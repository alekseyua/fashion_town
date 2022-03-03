import React from 'react';
import { FetcherList, dataStates } from '@garpix/fetcher';
import Pagination from '../../Views/Pagination';
import MyReviewsViews from '../../Views/MyReviewsViews';
import api from '../../api';

const apiContent = api.contentApi;

const MyReviewsComponent = ({ setModalStates }) => {
  const initialFilters = { page_size: 10 };
  return (
    <FetcherList isScrollTop={true} initFilter={initialFilters} api={apiContent.getMyReviewList}>
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
            {results.map((el) => {
              return <MyReviewsViews.Card setModalStates={setModalStates} key={el.id} {...el} />;
            })}
            <Pagination activePage={activePage} count={count} params={filterParams} />
          </>
        );
      }}
    </FetcherList>
  );
};

export default React.memo(MyReviewsComponent);
