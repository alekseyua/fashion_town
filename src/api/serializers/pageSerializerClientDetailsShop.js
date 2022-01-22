import siteConfigurationSerializer from './site_configuration';
import dayjs from '../../utils/dayjs';
import Api from '../../api';


const pageSerializerClientDetailsShop = (page) => {
  const { init_state } = page;
  const { page_info, profile, breadcrumbs = [] } = init_state;
  const pageInfo = page_info;
  return {
    ...init_state,
    ...pageInfo,
    //22.01.2021 г. 15:30
    client: {
        ...init_state.client,
        last_activity:dayjs(init_state.client.last_activity).format("DD.MM.YYYY HH:MM")
    },
    site_configuration: siteConfigurationSerializer(init_state.site_configuration),
    breadcrumbs: breadcrumbs,
    cart: profile.cart,
    notifications: profile.notifications,
    user_role: profile.user_role,
    user_status: profile.user_status,
    wishlist: profile.wishlist,
  };
};

export default pageSerializerClientDetailsShop;
