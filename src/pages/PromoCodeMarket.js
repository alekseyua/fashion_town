import React, { useState } from 'react';
import Layout from '../Views';
import PersonalPageViews from '../Views/PersonalPageViews';
import PromoCode from '../Views/MyShopViews/PromoCode';
import PersonalPageComponent from '../components/PersonalPageComponent';
import Modal from '../Views/ModalCreator';
import PromocodeShopComponent from '../components/PromocodeShopComponent';

const PromoCodeMarket = (props) => {
  const { header_menu, product, cabinet_menu, create_shop, cabinet_site_menu, statuses, profile } =
    props;
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  const { user = {}, shop, role, passport, organization, links, balance } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username } = user;

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
        rightChildComponent={<PromocodeShopComponent />}
      ></PersonalPageViews.WrapperPage>
    </Layout>
  );
};

export default React.memo(PromoCodeMarket);
