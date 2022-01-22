import siteConfigurationSerializer from './site_configuration';
import dayjs from '../../utils/dayjs';
import Api from '../../api';

const newsDetaildPageSerializer = (page) => {
  const { init_state } = page;
  const { page_info, profile, breadcrumbs, created_at, updated_at } = init_state;
  const pageInfo = page_info;
  return {
    ...init_state,
    ...pageInfo,
    site_configuration: siteConfigurationSerializer(init_state.site_configuration),
    breadcrumbs: breadcrumbs.map((el) => {
      return {
        title: el.title,
        link: el.slug,
      };
    }),
    cart: profile.cart,
    notifications: profile.notifications,
    user_role: profile.user_role,
    user_status: profile.user_status,
    wishlist: profile.wishlist,

    created_at: dayjs(Api.language, page_info.created_at).format('DD.MM.YYYY'),
  };
};

export default newsDetaildPageSerializer;
