import React, { useState } from 'react';
import Layout from '../Views';
import PersonalPageViews from '../Views/PersonalPageViews';
import PersonalPageComponent from '../components/PersonalPageComponent';
import Button from '../Views/Button';
import { GxCheckbox, GxInput, GxMenuItem } from '@garpix/garpix-web-components-react';
import { livePhotosCard, newsCard, productCard1, productCard2, productCard3 } from '../images';
import Select from '../Views/Select';
import DatePicker from 'react-date-picker';
import Modal from '../Views/ModalCreator';
import ContentLivePhotosShopComponent from '../components/ContentLivePhotosShopComponent';

const ContentLivePhotosMarket = (props) => {
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  const {
    header_menu,
    product,
    cabinet_menu,
    create_shop,
    cabinet_site_menu,
    profile_data,
    profile,
    location,
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
        rightChildComponent={
          <ContentLivePhotosShopComponent location={location} content={content} />
        }
      ></PersonalPageViews.WrapperPage>
    </Layout>
  );
};

export default React.memo(ContentLivePhotosMarket);
