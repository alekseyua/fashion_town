import React, { useState } from 'react';
import Layout from '../Views';
import PersonalPageViews from '../Views/PersonalPageViews';
import PersonalPageComponent from '../components/PersonalPageComponent';
import Modal from '../Views/ModalCreator';
import ShopAllProductComponent from '../components/ShopAllProductComponents';

const AllProductMarket = (props) => {
  const { cabinet_menu, cabinet_site_menu, profile, multy_choise_filters, location } = props;
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  const { user = {}, shop, role, passport, organization, links, id } = profile;
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
            username={username}
            role={role}
            setModalStates={setModalStates}
          />
        }
        rightChildComponent={
          <ShopAllProductComponent
            location={location}
            multy_choise_filters={multy_choise_filters}
            role={role}
          />
        }
      ></PersonalPageViews.WrapperPage>
    </Layout>
  );
};

export default React.memo(AllProductMarket);
