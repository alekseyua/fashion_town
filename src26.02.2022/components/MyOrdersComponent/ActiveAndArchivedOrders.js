import React, { useState, useEffect } from 'react';
import api from '../../api';
import MyOrdersComponent from '../MyOrdersComponent';

const apiOrder = api.orderApi;
const ActiveAndArchivedOrders = ({ setModalStates, modalStates, statuses, profile, page_type_catalog, }) => {
  const [state, setState] = useState({});
 
  return ( 
    <MyOrdersComponent.OrderDetailsContent>
      <MyOrdersComponent.ItemsInOrder
        page_type_catalog={page_type_catalog}
        profile={profile}
        apiOrder={apiOrder}
        statuses={statuses}
        setModalStates={setModalStates}
        modalStates={modalStates}
      />
    </MyOrdersComponent.OrderDetailsContent>
  );
};
export default React.memo(ActiveAndArchivedOrders);
