import React, { useState } from 'react';
import CabinetClientsViews from '../../Views/OrdersMarketViews/CabinetClientsViews';

const FilterAndSearch = ({ statuses, filterParams, loadData, activePage }) => {
  const options = statuses.map((el) => {
    return {
      title: `${el.title} (${el.count})`,
      value: el.status,
    };
  });
  options.unshift({
    title: `Все заказы`,
    value: null,
  });
  const [statusFieldValue, setStatusFieldValue] = useState(null);
  const [searchFieldValue, setSearchFieldValue] = useState(null);
  const handleStatusChange = (e) => {
    setStatusFieldValue(e.target.value);
    const params = {
      ...filterParams,
      status: e.target.value,
    };
    loadData(activePage, params, false);
  };
  const handleSearchChange = (e) => {
    setSearchFieldValue(e.target.value);
    const params = {
      ...filterParams,
      order_number: e.target.value,
    };
    loadData(activePage, params, false);
  };
  return (
    <>
      <CabinetClientsViews.ClientsWrapper>
        <CabinetClientsViews.FilterOrders
          filters={options}
          onStatusChange={handleStatusChange}
          statusValue={statusFieldValue}
        />
        <CabinetClientsViews.SearchOrders
          searchValue={searchFieldValue}
          onChangeSearchField={handleSearchChange}
        />
      </CabinetClientsViews.ClientsWrapper>
    </>
  );
};

export default React.memo(FilterAndSearch);
