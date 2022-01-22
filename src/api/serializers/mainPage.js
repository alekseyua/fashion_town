import productSerializer from './product';
import newsCardSerializer from './news';
import livePhotosSerializer from './livePhotos';
import siteConfigurationSerializer from './site_configuration';
import serializerReviews from './reviewsSerializer';

const mainPageSerializer = (page) => {
  const { init_state } = page;
  const { page_info, profile, main_page } = init_state;
  return {
    ...page_info,
    ...init_state,
    reviews: serializerReviews.reviewsSerializer(init_state.reviews),
    products: productSerializer(init_state.products),
    news: newsCardSerializer(init_state.news),
    live_photos: livePhotosSerializer(init_state.live_photos),
    site_configuration: siteConfigurationSerializer(init_state.site_configuration),
    first_screen: main_page.first_screen,
    in_stock_product_filters: main_page.in_stock_product_filters.map((el, i) => {
      return {
        ...el,
        active: i === 0,
      };
    }),
    cart: profile.cart,
    notifications: profile.notifications,
    user_role: profile.user_role,
    user_status: profile.user_status,
    wishlist: profile.wishlist,
  };
};

export default mainPageSerializer;
// "balance": "0.00",
// "status": 3,
// "cart": 0,
// "wishlist": 0,
// "notifications": 0