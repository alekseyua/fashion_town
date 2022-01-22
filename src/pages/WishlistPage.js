import React, { useState } from 'react';
import Layout from '../Views';
import WishlistComponent from '../components/WishlistComponent';
import { LOCAL_STORAGE_KEYS } from '../const';
import { getLocalStorage } from '../utils';

const WishlistPage = (props) => {
  const {
    cabinet_menu,
    create_shop,
    cabinet_site_menu,
    profile_data,
    profile,
    location,
    breadcrumbs,
    site_configuration,
  } = props;
  const [initfilters, setInitfilters] = useState({});
  const { user = {}, shop = {}, role, passport, organization, links, id, balance } = profile;
  const { is_has_shop, shop_link } = shop;
  const { page_type_catalog } = site_configuration;
  const { username } = user;
  return (
    <Layout {...props}>
      <WishlistComponent
        role={role}
        initfilters={{
          ids: getLocalStorage(LOCAL_STORAGE_KEYS.WISHLIST),
        }}
        page_type_catalog={page_type_catalog}
        location={location}
        breadcrumbs={breadcrumbs}
      />
    </Layout>
  );
};

export default React.memo(WishlistPage);
