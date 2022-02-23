import siteConfigurationSerializer from './site_configuration';

const page500Serializer = (page) => {
  const { init_state, page_info } = page;
  const { profile } = init_state;
  
  // debugger; // api -> serializers -> 500.js
  // return {
  //   ...init_state,
  //   ...page_info,
  //   site_configuration: siteConfigurationSerializer(init_state.site_configuration),
  //   cart: profile.cart,
  //   notifications: profile.notifications,
  //   user_role: profile.user_role,
  //   user_status: profile.user_status,
  //   wishlist: profile.wishlist,

  // };
  // временное решение по поводу выскакивания ошибки 500 !!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  return (e)=>{window.location?.reload();}
};

export default page500Serializer;
