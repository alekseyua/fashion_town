import siteConfigurationSerializer from "./site_configuration";

const livePhotosPageSerializer = page => {
  const { init_state } = page
  const { page_info, profile } = init_state;
  const pageInfo = page_info;
  return {
    ...init_state,
    ...pageInfo,
    site_configuration: siteConfigurationSerializer(init_state.site_configuration),

    cart: profile.cart,
    notifications: profile?.notifications,
    user_role: profile?.user_role,
    user_status: profile?.user_status,
    wishlist: profile?.wishlist,
  }
}

export default livePhotosPageSerializer;
