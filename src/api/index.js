import AbstractBaseApi from './AbstractBaseApi';
import ContentApi from './ContentApi';
import ProfileApi from './ProfileApi';
import UserApi from './UserApi';
import OrderApi from './OrderApi';
import CartApi from './CartApi';
import SocketApi from './SocketApi';
import ShopApi from './ShopApi';
import {
  mainPageSerializer,
  authorizationsPageSerializer,
  catalogPageSerializer,
  productPageSerializer,
  newsDetaildPageSerializer,
  livePhotosPageSerializer,
  pagePersonalSerializer,
  productSerializer,
  pageSerializer,
  pageNewsSerializer,
  accountSerializer,
  pageSerializerClientDetailsShop,
  productDetailsPageSerializer,
  pageBalanceSerializer,
  page404Serializer,
  page500Serializer,
  searchContentSerializer,
  myMarketPageSerializer,
} from './serializers';

const PAGES = {
  1: { serializer: mainPageSerializer },
  2: { serializer: pageSerializer },
  3: { serializer: pageSerializer },
  4: { serializer: productDetailsPageSerializer },
  5: { serializer: pageSerializer },
  6: { serializer: pageSerializer },
  7: { serializer: pageSerializer },
  34: { serializer: pagePersonalSerializer },
  9: { serializer: pageSerializer },
  10: { serializer: pageSerializer },
  11: { serializer: pageSerializer },
  12: { serializer: pageSerializer },
  13: { serializer: pageSerializer },
  14: { serializer: pageSerializer },
  15: { serializer: pageSerializer },
  16: { serializer: pageSerializer },
  17: { serializer: pageSerializer },
  18: { serializer: pageSerializer },
  19: { serializer: pageSerializer },
  20: { serializer: pageSerializer },
  21: { serializer: pageSerializer },
  22: { serializer: pageSerializer },
  27: { serializer: newsDetaildPageSerializer },
  24: { serializer: livePhotosPageSerializer },
  25: { serializer: pageSerializer },
  26: { serializer: pageNewsSerializer },
  29: { serializer: pageSerializer },
  25: { serializer: pageSerializer },
  28: { serializer: pageSerializer },
  32: { serializer: page404Serializer },
  33: { serializer: page500Serializer },
  23: { serializer: pageSerializer },
  36: { serializer: pageBalanceSerializer },
  35: { serializer: pageSerializer },
  30: { serializer: pageSerializer },
  38: { serializer: myMarketPageSerializer },
  39: { serializer: pageSerializer },
  40: { serializer: pageSerializer },
  41: { serializer: pageSerializer },
  42: { serializer: pageSerializer },
  43: { serializer: pageSerializer },
  44: { serializer: pageSerializer },
  45: { serializer: pageSerializer },
  46: { serializer: pageSerializer },
  47: { serializer: pageSerializer },
  48: { serializer: pageSerializer },
  49: { serializer: pageSerializer },
  50: { serializer: pageSerializer },
  51: { serializer: pageSerializer },
  52: { serializer: pageSerializer },
  53: { serializer: pageSerializer },
  55: { serializer: pageSerializer },
  54: { serializer: pageSerializerClientDetailsShop },
  'development-page': { serializer: pageSerializer },
  0: { serializer: pageSerializer },
};

class Api extends AbstractBaseApi {
  constructor(MAIN_URL, MAIN_URL_WS) {
    super(MAIN_URL, MAIN_URL_WS);
    this.contentApi = new ContentApi(MAIN_URL);
    this.profileApi = new ProfileApi(MAIN_URL);
    this.userApi = new UserApi(MAIN_URL);
    this.orderApi = new OrderApi(MAIN_URL);
    this.cartApi = new CartApi(MAIN_URL);
    this.shopApi = new ShopApi(MAIN_URL);
    this.socketApi = new SocketApi(MAIN_URL_WS);
  }

  getPage = async (params, queryParams = {}, axiosParams = {}) => {

    const slug = ['/ru', '/en'].includes(params[0]) ? '/' : params[0];
    //const slug = '';
    const res = await this.get(
      `/content/page${slug === '' ? '/' : slug}`,
      queryParams,
      axiosParams,
      );
     //console.log('getPage res.data',res.data);
    const page = res.data;
    const pageType = page.type;

    if (!PAGES[pageType]) {
      return { pageType, page: PAGES['development-page'].serializer(page) };
    } else {
      const { serializer } = PAGES[pageType];
      return { pageType, page: serializer(page) };
    }
  };

  updatePage = async (slug, queryParams = {}, axiosParams = {}) => {
    // const slug = ['/en', '/ru'].includes(params[0]) ? '/' : params[0];
    console.log('getPupdatePageage');
    const res = await this.get(`/content/page${slug}`, queryParams, axiosParams);
    const page = res.data;

    const pageType = page.type;
    const { serializer } = PAGES[pageType];
    return { pageType, page: serializer(page) };
  };

  // loginSocialUser = async (params) => {
  //     const res = await this.post('/social-auth/convert-token/', params);
  //     const data = res.data;
  //     const token = data.access_token;
  //     this.setAuthToken(token);
  //     return data;
  // }

  getUserBalance = async (params) => {
    const res = await this.post('/user/get_user_balance/', params);
    return res.data;
  };

  setPassword = async (params) => {
    const res = await this.post('/user/set_password/', params);
    return res.data;
  };

  restorePassword = async (params) => {
    const res = await this.post('/user/restore_password/', params);
    return res.data;
  };

  restorePasswordSetPassword = async (params) => {
    const res = await this.post('/user/restore_password_set_password/', params);
    return res.data;
  };
  getUser = async (params) => {
    const res = await this.get('/user/', params);
    //console.log("res getUser ", res.data);
    return res.data;
  };
  createUser = async (params) => {
    const res = await this.post('/user/', params);
    return res.data;
  };

  getShop = async (params = {}) => {
    const res = await this.get('/shop/shop/', params);
    return res.data;
  };

  updateUser = async (id, params) => {
    const res = await this.patch(`/user/${id}/`, params);
    return res.data;
  };

  getCurrentUser = async () => {
    const res = await this.get('/user/current/');
    return res.data;
  };

  getSearch = async (params = {}) => {
    const res = await this.get('/content/search/', params);
    return searchContentSerializer(res.data.results);
  };

  getMoreThanFiveProductsOfSearch = async (params = {}) => {
    const res = await this.get('/content/search/', params);
    return res.data;
  };

  getTotalPrice = async (cart) => {
    let promise = new Promise((resolve, reject) => {
      const total = Object.values(cart).reduce(
        (sum, item) => sum + Number(item.product.price) * Number(item.params.count),
        0,
      );
      setTimeout(() => resolve(total), 300);
    });
    return promise;
  };
}

const MAIN_URL = process.env.RAZZLE_APP_API_URL; //RAZZLE_APP_API_URL_LOCAL_BACK RAZZLE_APP_API_URL;
const MAIN_URL_WS = process.env.RAZZLE_APP_API_URL;
const api = new Api(`${MAIN_URL}`, `${MAIN_URL_WS}`);

export default api;
