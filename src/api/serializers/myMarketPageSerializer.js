import siteConfigurationSerializer from './site_configuration';
import dayjs from '../../utils/dayjs';
import Api from '../../api';

const myMarketPageSerializer = (page) => {
  const { init_state } = page;
  const { page_info, profile, breadcrumbs = [] } = init_state;
  const pageInfo = page_info;
  return {
    ...init_state,
    ...pageInfo,
    site_configuration: siteConfigurationSerializer(init_state?.site_configuration),
    breadcrumbs: breadcrumbs,
    cart: profile?.cart,
    notifications: profile?.notifications,
    user_role: profile?.user_role,
    user_status: profile?.user_status,
    wishlist: profile?.wishlist,
    tarif_info: {
      ...init_state?.tarif_info,
      expiration_date: dayjs(Api.language, init_state.tarif_info.expiration_date).format('DD.MM.YYYY'),
    },
  };
};

export default myMarketPageSerializer;
