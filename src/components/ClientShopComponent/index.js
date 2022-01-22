import React from 'react';
import { FetcherList, dataStates } from '@garpix/fetcher';
import { GxModal, GxForm } from '@garpix/garpix-web-components-react';
import Pagination from '../../Views/Pagination';
import MyShopViews from '../../Views/MyShopViews';
import api from '../../api';
import { useStoreon } from 'storeon/react';

const profileApi = api.profileApi;

const ClientShopComponent = ({}) => {
  const { currenssies } = useStoreon('currenssies'); //currenssies
  const tableHeaderData = [
    [
      {
        content: (
          <MyShopViews.ClientBase.TableContent.TableHeader nameOfStyle="clients-table__name">
            ФИО
          </MyShopViews.ClientBase.TableContent.TableHeader>
        ),
      },

      {
        content: (
          <MyShopViews.ClientBase.TableContent.TableHeader nameOfStyle="clients-table__address">
            Адрес
          </MyShopViews.ClientBase.TableContent.TableHeader>
        ),
      },

      {
        content: (
          <MyShopViews.ClientBase.TableContent.TableHeader nameOfStyle="clients-table__phone">
            Телефон
          </MyShopViews.ClientBase.TableContent.TableHeader>
        ),
      },
      {
        content: (
          <MyShopViews.ClientBase.TableContent.TableHeader
            nameOfStyle="clients-table__date"
            name={'Дата'}
          >
            <MyShopViews.ClientBase.TableContent.TableHeaderSpecial nameOfStyle="clients-table-small">
              (регистрации/активности)
            </MyShopViews.ClientBase.TableContent.TableHeaderSpecial>
          </MyShopViews.ClientBase.TableContent.TableHeader>
        ),
      },
      {
        content: (
          <MyShopViews.ClientBase.TableContent.TableHeader
            nameOfStyle="clients-table__balance"
            name={'Баланс'}
          >
            <MyShopViews.ClientBase.TableContent.TableHeaderSpecial nameOfStyle="clients-table-small">
              (Поступило/Ожидается)
            </MyShopViews.ClientBase.TableContent.TableHeaderSpecial>
          </MyShopViews.ClientBase.TableContent.TableHeader>
        ),
      },
    ],
  ];

  const collectorTableData = (data) => {
    const results = [];
    data.forEach((element) => {
      results.push([
        {
          attr: { 'data-label': 'ФИО' },
          content: <MyShopViews.ClientBase.FIO to={element.url} fio={element.name} />,
        },
        {
          attr: { 'data-label': 'Адрес' },
          content: <MyShopViews.ClientBase.Adress adress={element.address} />,
        },
        {
          attr: { 'data-label': 'Телефон' },
          content: element.phone,
        },
        {
          attr: { 'data-label': 'Дата (регистрации/активности)' },
          content: (
            <MyShopViews.ClientBase.Date
              date1={element.date_joined}
              date2={element.last_activity}
            />
          ),
        },
        {
          attr: { 'data-label': 'Баланс (Поступило/Ожидается)' },
          content: (
            <MyShopViews.ClientBase.Balance
              balance1={`${element.balances.balance} ${currenssies}`}
              balance2={`+${element.balances.balance_await} ${currenssies}`}
            />
          ),
        },
      ]);
    });

    return results;
  };

  return (
    <React.Fragment>
      <FetcherList
        isScrollTop={false}
        initFilter={{ page_size: 19 }}
        api={profileApi.getShopUserList}
      >
        {(data) => {
          const {
            results = [],
            showMore,
            isNext,
            reload,
            activePage,
            count,
            loadData,
            filterParams,
          } = data;
          const tableBodyData = collectorTableData(results);
          return (
            <>
              <MyShopViews.ClientBase.AboveTable
                header={'База покупателей'}
                search={'Поиск ФИО клиента'}
                loadData={loadData}
                filterParams={filterParams}
              >
                <MyShopViews.ClientBase.MenuItem
                  number={1}
                  value={'По дате последней активности'}
                />
                <MyShopViews.ClientBase.MenuItem number={2} value={'По алфавиту (А-Я)'} />
                <MyShopViews.ClientBase.MenuItem number={3} value={'По алфавиту (Я-А)'} />
              </MyShopViews.ClientBase.AboveTable>
              <MyShopViews.ClientBase.TableContent.TableBody
                tableHeaderData={tableHeaderData}
                tableBodyData={tableBodyData}
              />
              <Pagination activePage={activePage} count={count} />
            </>
          );
        }}
      </FetcherList>
    </React.Fragment>
  );
};

export default React.memo(ClientShopComponent);
