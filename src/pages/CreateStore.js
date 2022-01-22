import React from 'react';
import Layout from '../Views';
import CreateStoreComponent from '../components/CreateStoreComponent';

const CreateStore = (props) => {
  const {
    header_menu,
    product,
    cabinet_menu,
    create_shop,
    cabinet_site_menu,
    profile_data,
    profile,
  } = props;
  const { user = {}, shop, role, passport, organization, links, id, balance } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username } = user;

  return (
    <Layout {...props}>
      <CreateStoreComponent {...props} />
    </Layout>
  );
};

export default React.memo(CreateStore);
