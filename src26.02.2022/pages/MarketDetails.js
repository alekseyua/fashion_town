import React, { useState } from 'react';
import Layout from '../Views';
import PersonalPageViews from '../Views/PersonalPageViews';
import MyShopViews from '../Views/MyShopViews/MyShop';
import PersonalPageComponent from '../components/PersonalPageComponent';
import { arrowRightBlack, storeIcon, toolTipIcon } from '../images';
import Modal from '../Views/ModalCreator';
import MyShopComponents from '../components/MyShopComponents';
import PayModalContent from '../components/BalanceComponent/PayModalContent';
import api from '../api';

const orderApi = api.orderApi;

const MarketDetails = (props) => {
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  const {
    cabinet_menu,
    cabinet_site_menu,
    profile_data,
    profile,
    clients_count,
    orders_count,
    products_count,
    logo,
    domain,
    tarif_info,
    orders_page,
    products_page,
    clients_page,
  } = props;
  const { user = {}, shop, role, id, balance } = profile;
  const { is_has_shop, shop_link, shop_logo, shop_id, shop_title } = shop;
  const { username } = user;


  const closeModal = () => {
    setModalStates({
      content: null,
      show: false,
      addClass: false,
    });
  };

  const payTarifHandleClick = () => {
    orderApi.getRandomRequizites().then((res) => {
      setModalStates({
        content: <PayModalContent closeModal={closeModal} requisites={res} />,
        show: true,
        addClass: 'modal-payments',
      });
    });
  };

  return (
    <Layout {...props}>
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
        rightChildComponent={
          <>
            <MyShopViews.MainBlock>
              <MyShopViews.Header name={'Мой магазин'} />
              <MyShopViews.ContentBlock>
                <MyShopViews.Wrapper>
                  <MyShopViews.Cards
                    name={'Покупатели'}
                    count={clients_count}
                    page={clients_page}
                    arrowRightBlack={arrowRightBlack}
                  />
                  <MyShopViews.Cards
                    name={'товары'}
                    count={products_count}
                    page={products_page}
                    arrowRightBlack={arrowRightBlack}
                  />
                  <MyShopViews.Cards
                    name={'заказы'}
                    count={orders_count}
                    page={orders_page}
                    arrowRightBlack={arrowRightBlack}
                  />
                </MyShopViews.Wrapper>
                {/* Блок счетчиков кончился */}
                <MyShopViews.Wrapper bottom={true}>
                  <MyShopViews.Bottom
                    domain={domain}
                    storeIcon={storeIcon}
                    toolTipIcon={toolTipIcon}
                  />
                </MyShopViews.Wrapper>
              </MyShopViews.ContentBlock>
            </MyShopViews.MainBlock>
            <MyShopViews.MainBlock>
              <MyShopViews.Header name={'Тариф'} />
              <MyShopViews.ContentBlock>
                <MyShopViews.PayInfo
                  handleClick={payTarifHandleClick}
                  expiration_date={tarif_info.expiration_date}
                />
                <MyShopViews.InfoBlock>
                  <MyShopViews.InfoText text={tarif_info.description} />
                </MyShopViews.InfoBlock>
              </MyShopViews.ContentBlock>
            </MyShopViews.MainBlock>
            <MyShopViews.MainBlock>
              <MyShopViews.Header name={'Реквизиты для оплаты'} />
              <MyShopViews.ContentBlock>
                <MyShopComponents.PaymentDetailsFromMyMarket />
              </MyShopViews.ContentBlock>
            </MyShopViews.MainBlock>
            <MyShopComponents.MyShopSettingBlock
              shop_id={shop_id}
              shop_title={shop_title}
              logo={shop_logo}
              domain={domain}
            />
          </>
        }
      ></PersonalPageViews.WrapperPage>
    </Layout>
  );
};

export default React.memo(MarketDetails);
