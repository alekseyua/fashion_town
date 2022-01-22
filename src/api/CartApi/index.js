import AbstractBaseApi from '../AbstractBaseApi';
import { serializeCartItemForMultipleDelete } from './serializers';

export default class CartApi extends AbstractBaseApi {
  getCartData = async (params = {}) => {
   //console.log("zapros getCartData");
    const res = await this.get('/cart/my_cart/', params);
   //console.log("zapros otv getCartData", res);
    return res.data;
  };
  updateCartData = async (params = {}) => {
   // console.log("zapros updateCartData", params);
    const res = await this.post('/cart/update_cart/', params);
    //console.log("zapros otv updateCartData", res);
    return res.data;
  };
  deleteCartData = async (params = {}) => {
    //console.log("zapros deleteCartData", params);
    const res = await this.delete('/cart/del_from_cart/', params);
    return res.data;
  };
  addToCart = async (params) => {
    //console.log("addToCart zapros", params);
    const res = await this.post('/cart/add_or_modify/', params);
    //const res = await this.post('/cart/add_to_cart/', params);
    //console.log("addToCart zapros otv", res);
    return res.data;
  };
  multipleDeleteFromCart = async (params = {}) => {
    params['items'] = serializeCartItemForMultipleDelete(params['items']);

    //console.log("zapros multipleDeleteFromCart", params);
    const res = await this.delete('/cart/multiple_del_from_cart/', params);
    return res.data;
  };
  selectOrUnSelectAllItemCart = async (isSelect = false, params = {}) => {
    if (isSelect) {
      //console.log("zapros selectOrUnSelectAllItemCart 1", params);
      const res = await this.post('/cart/select_all/', params);
      return res.data;
    } else {
      //console.log("zapros selectOrUnSelectAllItemCart 2", params);
      const res = await this.post('/cart/unselect_all/', params);
      return res.data;
    }
  };
  // *************************************************************************
  cartAddComment = async (params = {}) => {
     console.log("zapros cartAddComment", params);
     const res = await this.post('/cart/add_comment/', params);
     console.log("zapros otv cartAddComment", res);
     return res.data;
   };
}
