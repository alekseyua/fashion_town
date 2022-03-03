import productSerializer from './product';
import newsCardSerializer from './news';
import livePhotosSerializer from './livePhotos';
import siteConfigurationSerializer from './site_configuration';

const pageNewsSerializer = (page) => {
  const { init_state } = page;
  const { page_info, profile, main_page } = init_state;
  return {
    ...page_info,
    ...init_state,
    cart: profile?.cart,
    notifications: profile?.notifications,
    user_role: profile?.user_role,
    user_status: profile?.user_status,
    wishlist: profile?.wishlist,
  };
};

export default pageNewsSerializer;