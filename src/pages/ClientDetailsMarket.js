import {
  GxButton,
  GxIcon,
  GxInput,
  GxMenuItem,
  GxSelect,
} from '@garpix/garpix-web-components-react';
import React, { useState } from 'react';
import PersonalPageComponent from '../components/PersonalPageComponent';
import { searchIcon } from '../images';
import Layout from '../Views';
import PersonalPageViews from '../Views/PersonalPageViews';
import Table from '../Views/Table';
import { useStoreon } from 'storeon/react';
import Modal from '../Views/ModalCreator';

const ClientDetailsMarket = (props) => {
  const {
    header_menu,
    product,
    cabinet_menu,
    create_shop,
    cabinet_site_menu,
    profile_data,
    profile,
    client,
  } = props;
  const { currenssies } = useStoreon('currenssies');
  const currentCurrcensies = String(currenssies).toUpperCase();
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  const { user = {}, shop, role, passport, organization, links, id } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username } = user;
  // const [cartData, setCartData] = useState(initialCartData);
  const tableHeaderData = [
    [
      {
        content: 'Дата',
      },

      {
        content: '№ заказа',
      },
      {
        content: 'Стоимость',
      },
      {
        content: 'Статус',
      },
    ],
  ];
  const tableBodyData = [
    [
      {
        attr: { 'data-label': 'Дата' },
        content: '20.11.2020',
      },
      {
        attr: { 'data-label': '№ заказа' },
        content: <a href="#">20201120-FTN33-210-955687</a>,
      },
      {
        attr: { 'data-label': 'Стоимость' },
        content: '5874 ZL',
      },
      {
        attr: { 'data-label': 'Статус' },
        content: (
          <GxSelect
            size="sm"
            placeholder="Статус заказа: выбрать"
            className="cabinet_market__status"
          >
            <GxMenuItem value="option-1" className="cabinet_market__status_item">
              Замена
            </GxMenuItem>
            <GxMenuItem value="option-2" className="cabinet_market__status_item">
              Отправлено
            </GxMenuItem>
            <GxMenuItem value="option-3" className="cabinet_market__status_item">
              Возврат
            </GxMenuItem>
            <GxMenuItem value="option-4" className="cabinet_market__status_item">
              Отменен
            </GxMenuItem>
            <GxMenuItem value="option-5" className="cabinet_market__status_item">
              Ожидается оплата
            </GxMenuItem>
            <GxMenuItem value="option-6" className="cabinet_market__status_item">
              Принят в работу
            </GxMenuItem>
            <GxMenuItem value="option-7" className="cabinet_market__status_item">
              Упаковка
            </GxMenuItem>
            <GxMenuItem value="option-8" className="cabinet_market__status_item">
              Ожидается оплата за доставку
            </GxMenuItem>
            <GxMenuItem value="option-9" className="cabinet_market__status_item">
              Ожидается оплата
            </GxMenuItem>
          </GxSelect>
        ),
      },
    ],
    [
      {
        attr: { 'data-label': 'Дата' },
        content: '20.11.2020',
      },
      {
        attr: { 'data-label': '№ заказа' },
        content: <a href="#">20201120-FTN33-210-955687</a>,
      },
      {
        attr: { 'data-label': 'Стоимость' },
        content: '1 355 874 ZL',
      },
      {
        attr: { 'data-label': 'Статус' },
        content: (
          <GxSelect
            size="sm"
            placeholder="Статус заказа: выбрать"
            className="cabinet_market__status"
          >
            <GxMenuItem value="option-1" className="cabinet_market__status_item">
              Замена
            </GxMenuItem>
            <GxMenuItem value="option-2" className="cabinet_market__status_item">
              Отправлено
            </GxMenuItem>
            <GxMenuItem value="option-3" className="cabinet_market__status_item">
              Возврат
            </GxMenuItem>
            <GxMenuItem value="option-4" className="cabinet_market__status_item">
              Отменен
            </GxMenuItem>
            <GxMenuItem value="option-5" className="cabinet_market__status_item">
              Ожидается оплата
            </GxMenuItem>
            <GxMenuItem value="option-6" className="cabinet_market__status_item">
              Принят в работу
            </GxMenuItem>
            <GxMenuItem value="option-7" className="cabinet_market__status_item">
              Упаковка
            </GxMenuItem>
            <GxMenuItem value="option-8" className="cabinet_market__status_item">
              Ожидается оплата за доставку
            </GxMenuItem>
            <GxMenuItem value="option-9" className="cabinet_market__status_item">
              Ожидается оплата
            </GxMenuItem>
          </GxSelect>
        ),
      },
    ],
  ];

  return (
    <Layout main {...props}>
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
            username={username}
            role={role}
            setModalStates={setModalStates}
          />
        }
        rightChildComponent={
          <>
            <div className="cabinet_mobile_wrapper">
              <h1 className="cabinet_orders_details__title">
                {client.last_name} {client.first_name} {client.middle_name}
              </h1>
              <p className="cabinet_clients__subheader">
                Последняя активность:{' '}
                <span className="cabinet_clients__subheader-black">{client.last_activity}</span>
              </p>

              <div className="cabinet_clients__infoblock">
                <div className="cabinet_clients__left">
                  <div className="cabinet_clients__left_wrap">
                    <h3 className="cabinet_clients__left_head">Адрес:</h3>
                    <p className="cabinet_clients__left_text">{client.address}</p>
                  </div>
                  <div className="cabinet_clients__left_wrap-balance">
                    <h3 className="cabinet_clients__left_head">Баланс:</h3>
                    <div className="cabinet_clients__balance_wrapper">
                      <div className="cabinet_clients__balance_left">
                        {client.balances.balance} {currentCurrcensies}
                      </div>
                      <div className="cabinet_clients__balance_right">
                        +{client.balances.balance_await} {currentCurrcensies}
                      </div>
                    </div>
                  </div>

                  <div className="cabinet_clients__left_wrap">
                    <h3 className="cabinet_clients__left_head">Телефон:</h3>
                    <p className="cabinet_clients__left_text">
                      {client.phone ? (
                        <a href={`tel:${client.phone}`}>{client.phone}</a>
                      ) : (
                        'Не введён...'
                      )}
                    </p>
                  </div>
                </div>

                <GxButton variant="text" size="sm" className="cabinet_clients__button">
                  Подтвердить зачисление
                </GxButton>
              </div>

              <h2 className="cabinet_orders_details__listtitle-mb">
                Всего заказов: ({client.orders_count})
              </h2>
              <div className="cabinet-clients__wrapper">
                <GxInput placeholder="Поиск по № заказа" className="cabinet-clients__search">
                  <GxIcon slot="prefix" src={searchIcon} />
                </GxInput>
                <GxSelect className="cabinet-clients__select" placeholder="Все заказы">
                  <GxMenuItem value="option-1">Все заказы</GxMenuItem>
                  <GxMenuItem value="option-2">Замена</GxMenuItem>
                  <GxMenuItem value="option-3">Отправлено</GxMenuItem>
                  <GxMenuItem value="option-4">Возврат</GxMenuItem>
                  <GxMenuItem value="option-5">Отменен</GxMenuItem>
                  <GxMenuItem value="option-6">Ожидается оплата</GxMenuItem>
                  <GxMenuItem value="option-7">Принят в работу</GxMenuItem>
                  <GxMenuItem value="option-8">Упаковка</GxMenuItem>
                  <GxMenuItem value="option-9">Ожидается оплата за доставку</GxMenuItem>
                  <GxMenuItem value="option-10">Ожидается оплата</GxMenuItem>
                </GxSelect>
              </div>
              <Table
                classNameTable="market-table"
                tableHeaderData={tableHeaderData}
                tableBodyData={tableBodyData}
              />
            </div>
          </>
        }
      ></PersonalPageViews.WrapperPage>
    </Layout>
  );
};

export default React.memo(ClientDetailsMarket);
