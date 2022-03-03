import React, { useState } from 'react';
import Layout from '../Views';
import PersonalPageViews from '../Views/PersonalPageViews';
import PersonalPageComponent from '../components/PersonalPageComponent';
import Modal from '../Views/ModalCreator';
import ShopFooterSettingsComponent from '../components/ShopFooterSettingsComponent';

const ContentFooterMarket = (props) => {
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  const {
    header_menu,
    product,
    cabinet_menu,
    create_shop,
    cabinet_site_menu,
    profile_data,
    profile,
    content,
  } = props;
  const { user = {}, shop, role, passport, organization, links, id, balance } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username } = user;

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
        rightChildComponent={<ShopFooterSettingsComponent content={content} />}
      ></PersonalPageViews.WrapperPage>
    </Layout>
  );
};

export default React.memo(ContentFooterMarket);
