import React, { useState } from 'react';
import Layout from '../Views';
import Container from '../Views/Container';
import ExportCatalogComponents from '../components/ExportCatalogComponents';
import Modal from '../Views/ModalCreator';
import LinkLeadingBack from '../Views/LinkLeadingBack';


const ExportCatalog = (props) => {
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  const {
    cabinet_menu,
    create_shop,
    cabinet_site_menu,
    profile_data,
    profile,
    site_configuration,
    multy_choise_filters,
  } = props;
  const { user = {}, shop, role, passport, organization, links, id, balance } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username } = user;
  return (
    <Layout {...props}>
      <Modal.StorControllerModal />
      <Container>
        <LinkLeadingBack to={site_configuration.page_type_account} />
        <ExportCatalogComponents role={role} multy_choise_filters={multy_choise_filters} />
      </Container>
    </Layout>
  );
};

export default React.memo(ExportCatalog);
