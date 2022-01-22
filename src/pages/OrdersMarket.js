import React, { useState } from 'react';
import Layout from '../Views';
import PersonalPageViews from '../Views/PersonalPageViews';
import PersonalPageComponent from '../components/PersonalPageComponent';
import Modal from '../Views/ModalCreator';
import OrdersMarketComponent from '../components/OrdersMarketComponent';

const OrdersMarket = (props) => {
  const {
    header_menu,
    product,
    cabinet_menu,
    create_shop,
    cabinet_site_menu,
    statuses,
    profile,
    count,
    activePage,
  } = props;
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  const { user = {}, shop, role, passport, organization, links, balance } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username } = user;
  const testStatuses = [
    {
      status: 'created',
      title: 'Создан',
      count: 0,
    },
    {
      status: 'payment_waiting',
      title: 'Ожидается оплата',
      count: 0,
    },
    {
      status: 'in_process',
      title: 'Принят в работу',
      count: 0,
    },
    {
      status: 'packaging',
      title: 'Упаковка заказа',
      count: 0,
    },
    {
      status: 'delivery_payment_waiting',
      title: 'Ожидается оплата за доставку',
      count: 0,
    },
    {
      status: 'sended',
      title: 'Заказ отправлен',
      count: 0,
    },
    {
      status: 'closed',
      title: 'Закрыт',
      count: 0,
    },
    {
      status: 'canceled',
      title: 'Отмена заказа',
      count: 0,
    },
    {
      status: 'return',
      title: 'Возврат',
      count: 0,
    },
  ];



  return (
    <Layout responsive {...props}>
      <Modal.ModalCreator {...modalStates} setModalStates={setModalStates} />
      <Modal.StorControllerModal />
      <PersonalPageViews.WrapperPage
        leftChildComponent={
          <PersonalPageComponent.SidebarEntryPersonalPage
            shop={shop}
            create_shop={shop_link}
            is_has_shop={is_has_shop}
            cabinet_menu={cabinet_menu}
            cabinet_site_menu={cabinet_site_menu}
            balance={balance}
            username={username}
            role={role}
            setModalStates={setModalStates}
          />
        }
        rightChildComponent={<OrdersMarketComponent.CabinetMarket statuses={testStatuses} />}
      ></PersonalPageViews.WrapperPage>
    </Layout>
  );
};

export default React.memo(OrdersMarket);
