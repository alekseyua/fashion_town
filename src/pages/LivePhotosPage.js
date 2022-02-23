import React, { useState } from 'react';
import Layout from '../Views';
import LivePhotosComponent from '../components/LivePhotosComponent';
import Modal from '../Views/ModalCreator';


const LivePhotosPage = (props) => {
  const { cabinet_menu, create_shop, cabinet_site_menu, profile, breadcrumbs, location } = props;
  const { user = {}, shop = {}, role, passport, organization, links, balance } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username = '' } = user;
  //todo: можно пропсом кастрировать футер
 
  return (
    <Layout profile={profile} {...props}>
      <Modal.StorControllerModal />
      <LivePhotosComponent location={location} breadcrumbs={breadcrumbs} />
    </Layout>
  );
};

export default React.memo(LivePhotosPage);
