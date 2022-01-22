import React from 'react';
import CabinetMarketViews from '../../Views/OrdersMarketViews/CabinetMarketViews';
import CabinetClientsViews from '../../Views/OrdersMarketViews/CabinetClientsViews';
import { FetcherList } from '@garpix/fetcher';
import Table from '../../Views/Table';
import FilterAndSearch from './FilterAndSearch';
import { useStoreon } from 'storeon/react';
import Paginations from '../../Views/Pagination/Pagination';
import api from '../../api/';
import { Link } from 'react-router-dom';
import Text from '../Text';

const apiOrder = api.orderApi;
const initialFilters = { page: 1, page_size: 10 };

const testData = [
  {
    id: 1,
    created_at: '20.11.2020',
    order_number: '20201120-FTN33-210-955687',
    address: 'Сюда',
    first_name: 'Андрюха',
    last_name: 'Папич',
    total: '156 151',
    status: 'created',
  },
  {
    id: 2,
    created_at: '05.12.2020',
    order_number: '20201120-FTN33-210-900041',
    address: 'Туда',
    first_name: 'Андрей',
    last_name: 'Скала',
    total: '100 000',
    status: 'packaging',
  },
];
 
const tableHeaderData = [
  [
    {
      content: 'Дата',
    },

    {
      content: '№ заказа',
    },

    {
      content: 'Получатель',
    },
    {
      content: 'Стоимость',
    },
    {
      content: 'Статус',
    },
  ],
];

const changeStatus = (e, dataFeth) => {
  //todo: обращение к апи за обновлением статуса
  dataFeth.updateElementByKey(
    {
      ...dataFeth.obj,
      status: e.target.value,
    },
    dataFeth.obj.status,
    'status',
  );
};
const createName = ({ first_name, last_name, middle_name }) => {

  if (last_name && first_name) {
    return `${last_name} ${String(first_name[0]).toUpperCase()}.`;
  } else {
    return <Text text={'ivalid.name'} />;
  }
};
const createTdForTable = (data = [], currenssies, statuses, onStatusChange, dataFeth) => {
  let results = [];
  data.forEach((el) => {
    let tr = [];
    //!date
    tr.push({
      attr: { 'data-label': 'Дата' },
      content: el.created_at,
    });
    //!№ order
    tr.push({
      attr: { 'data-label': '№ заказа' },
      content: (
        <>
          {el.order_number.length ? (
            <Link to={el.order_number}>{el.order_number}</Link>
          ) : (
            'Товар не выбран'
          )}
        </>
      ),
    });
    //!full name
    tr.push({
      attr: { 'data-label': 'Получатель' },
      content: <Link to="#">{createName(el)}</Link>,
    });
    //!total count
    tr.push({
      attr: { 'data-label': 'Стоимость' },
      content: (
        <>
          {el.total ? el.total : 0} {currenssies}
        </>
      ),
    });
    //!status
    tr.push({
      attr: { 'data-label': 'Статус' },
      content: (
        <CabinetClientsViews.OrderStatusSelect
          currentStatus={el.status}
          statuses={statuses}
          onOrderStatusChange={(e) => {
            onStatusChange(e, { ...dataFeth, obj: el });
          }}
        />
      ),
    });
    results.push(tr);
  });
  return results;
};
const CabinetMarket = ({ statuses }) => {
  const { currenssies } = useStoreon('currenssies'); //currenssies
  return (
    <>
      <FetcherList isScrollTop={true} initFilter={initialFilters} api={apiOrder.getOrders}>
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
          let newResults = createTdForTable(testData, currenssies, statuses, changeStatus, {
            updateElementByKey,
            loadData,
            filterParams,
          });
          let tableData = [...newResults];
          return (
            <>
              <CabinetMarketViews.TopBlock
                profit={''}
                proceeds={''}
                cost={''}
                ordersCount={count}
                currenssies={currenssies}
              />
              <FilterAndSearch
                statuses={statuses}
                filterParams={filterParams}
                loadData={loadData}
                activePage={activePage}
              />
              <Table
                statusLoad={status}
                classNameTable="market-table"
                tableHeaderData={tableHeaderData}
                tableBodyData={tableData}
              />
              <Paginations activePage={activePage} count={count} />
              
            </>
          );
        }}
      </FetcherList>
    </>
  );
};

export default React.memo(CabinetMarket);
