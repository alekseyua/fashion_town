import React from 'react';
import { FetcherList, dataStates } from '@garpix/fetcher';
import Pagination from '../../Views/Pagination';
import Title from '../../Views/Title';
import NotificationsViews from '../../Views/NotificationsViews';
import api from '../../api';

const apiProfile = api.profileApi;

const NotificationsComponent = ({}) => {
  const initialFilters = {};
  return (
    <>
      <Title variant={'cabinet__heading'} type={'h3'}>
        Уведомления
      </Title>
      <FetcherList isScrollTop={true} initFilter={initialFilters} api={apiProfile.getNotifications}>
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
              <NotificationsViews.Wrapper>
                <NotificationsViews.SubText>
                  Здесь хранится история переписки со специалистами справочной службы FTown. текст
                  текст текст
                </NotificationsViews.SubText>

                <NotificationsViews.Header />
                {results.map((el) => {
                  return (
                    <NotificationsViews.Item
                      isRead={el.is_read}
                      date={el.created_at}
                      message={el.message}
                    />
                  );
                })}
              </NotificationsViews.Wrapper>
              <Pagination activePage={activePage} count={count} params={filterParams} />
            </>
          );
        }}
      </FetcherList>
    </>
  );
};

export default React.memo(NotificationsComponent);
