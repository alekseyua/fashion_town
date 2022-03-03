import React, { useState } from 'react';
import Layout from '../Views';
import Modal from '../Views/ModalCreator';
import PersonalPageViews from '../Views/PersonalPageViews';
import PersonalPageComponent from '../components/PersonalPageComponent';
import { useStoreon } from 'storeon/react';
import OrderDetailsPersonalPageComponent from '../components/OrderDetailsPersonalPageComponent';

const initialCartData = {
  cartitem_set: [],
  id: 8,
}; 
const OrderDetailsPersonalPage = (props) => {
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  const {
    header_menu,
    product,
    cabinet_menu,
    create_shop,
    cabinet_site_menu,
    profile_data,
    profile,
    order,
    slug,
    role_configuration,
  } = props;
  const { currenssies } = useStoreon('currenssies'); //currenssies
  const currentCurrcensies = String(currenssies).toUpperCase();
  const { user = {}, shop, role, passport, organization, links, id, balance } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username } = user;
  const [cartData, setCartData] = useState(initialCartData);
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
        rightChildComponent={
          <OrderDetailsPersonalPageComponent
            currentCurrcensies={currentCurrcensies}
            order={order}
            slug={slug}
            role_configuration={role_configuration}
            setModalStates={setModalStates}
          />
        }
      ></PersonalPageViews.WrapperPage>
    </Layout>
  );
};

export default React.memo(OrderDetailsPersonalPage);
