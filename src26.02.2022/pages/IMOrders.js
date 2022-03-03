import React, { useState } from 'react';
import Layout from '../Views';
import MyOrdersComponent from '../components/MyOrdersComponent';
import PersonalPageComponent from '../components/PersonalPageComponent';
import Modal from '../Views/ModalCreator';
import PersonalPageViews from '../Views/PersonalPageViews';

const IMOrders = (props) => {
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  const { cabinet_menu, create_shop, cabinet_site_menu, statuses, profile } = props;
  const { user = {}, shop, role, passport, organization, links, balance, id } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username } = user;
  //todo: можно пропсом кастрировать футер

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
          <MyOrdersComponent.ActiveAndArchivedOrders
            statuses={statuses}
            setModalStates={setModalStates}
            profile={id}
          />
        }
      ></PersonalPageViews.WrapperPage>
    </Layout>
  );
};

export default React.memo(IMOrders);
