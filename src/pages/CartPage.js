import React from 'react';
import Layout from '../Views';
import Cart from '../components/Cart';
import Modal from '../Views/ModalCreator';

const CartPage = (props) => {
  const {
    cabinet_menu,
    create_shop,
    cabinet_site_menu,
    profile_data,
    profile,
    site_configuration,
  } = props;
  const { user = {}, shop, role, passport, organization, links, id } = profile;
  const { checkout_slug, page_type_catalog } = site_configuration;
  return (
    <Layout main {...props}>
      <Modal.StorControllerModal />
      <Cart
        role={role}
        checkout_slug={checkout_slug}
        site_configuration={site_configuration}
        page_type_catalog={page_type_catalog}
      />
    </Layout>
  );
};

export default React.memo(CartPage);
