import AbstractBaseApi from '../AbstractBaseApi';
import {
  serializeOrderData,
  serializeAddressDelivery,
  serializeAddressDeliveryPost,
  serializeOrderIsNullField,
  serializePaymentsProfile,
} from './serializers';

export default class OrderApi extends AbstractBaseApi {
  getOrderAddressDeliviry = async (params = {}) => {
    //console.log('getOrderAddressDeliviry zapros',params);
    const res = await this.get('/order/delivery_address/', params);
    return serializeAddressDelivery(res.data);
  };

  postOrderAddressDeliviry = async (params = {}, idProfile) => {

    params = serializeAddressDeliveryPost(params, idProfile);
    //console.log('postOrderAddressDeliviry zapros',params);
    const res = await this.post('/order/delivery_address/', params);
    return res;
  };
  getByIdOrderAddressDeliviry = async (id, params = {}) => {
    //console.log('getByIdOrderAddressDeliviry zapros',params);
    const res = await this.get(`/order/delivery_address/${id}/`, params);
    return res;
  };
  putByIdOrderAddressDeliviry = async (id, params = {}) => {
    params = serializeAddressDeliveryPost(params, id);
    //console.log('putByIdOrderAddressDeliviry zapros',params);
    const res = await this.put(`/order/delivery_address/${id}/`, params);
    return res;
  };
  patchByIdOrderAddressDeliviry = async (id, params = {}) => {
    //console.log('patchByIdOrderAddressDeliviry zapros',params);
    const res = await this.patch(`/order/delivery_address/${id}/`, params);
    return res;
  };
  deleteByIdOrderAddressDeliviry = async (id, params = {}) => {
    //console.log('deleteByIdOrderAddressDeliviry zapros',params);
    const res = await this.delete(`/order/delivery_address/${id}/`, params);
    return res;
  };
  //заказы
  getOrders = async (params = {}) => {
    //console.log('getOrders zapros',params);
    const res = await this.get('/order/order/', params);
    return serializeOrderData(res.data);
  };
  createOrder = async (params = {}) => {
    // console.log('createOrder zapros',params);
    const res = await this.post('/order/order/', serializeOrderIsNullField(params));
    //console.log('createOrder otvet', res.data);
    return res.data;
  };
  getOrderAddressSearch = async (params = {}) => {
    //console.log('getOrderAddressSearch zapros',params);
    const res = await this.get('/order/address_search/', params);
    return res.data;
  };
  getRandomRequizites = async (params = {}) => {
    // console.log('getRandomRequizites zapros',params);
    const res = await this.get('/order/get_random_requisites/', params);
    //console.log('getRandomRequizites zapros',res.data);
    return res.data;
  };
  createPayments = async (params = {}) => {
    //console.log('createPayments zapros',params);
    const res = await this.post(`/order/payments/`, params);
    return res.data;
  };
  // ******************************************************************************

  // order/order_list
  listOrderItem = async (params = {}) => {
    //console.log('createPayments zapros',params);
    const res = await this.get(`/order/order/`, params);
    return res.data;
  };

   // order/get_order_items
   getOrderItemsList = async (params = {}) => {
    //console.log('order/get_order_items zapros',params);
    const res = await this.get(`/order/order/get_order_items/`, params);
    return res.data;
  };


  // order/delete_order_item
  deleteOrderItem = async (params = {}) => {
    //console.log('createPayments zapros',params);
    const res = await this.post(`/order/order/delete_order_item/`, params);
    return res.data;
  };

  // order/delete_order_item
  deleteOrder = async (params = {}) => {
    //console.log('createPayments zapros',params);
    const res = await this.post(`/order/order/delete_order/`, params);
    return res.data;
  };

  // order/cancel_order_item
  cancelOrderItem = async (params = {}) => {
    //console.log('cancelPayments zapros',params);
    const res = await this.post(`/order/order/cancel_order_item/`, params);
    return res.data;
  };

  // order/cancel_order_item
  cancelOrder = async (params = {}) => {
    //console.log('cancelPayments zapros',params);
    const res = await this.post(`/order/order/cancel_order/`, params);
    return res.data;
  };

  orderAddComment = async (params = {}) => {
    // console.log("zapros orderAddComment", params);
    const res = await this.post('/order/order/add_comment/', params);
    // console.log("zapros otv orderAddComment", res);
    return res.data;
  };

  // ******************************************************************************
  getCountry = async (params = {}) => {
    //console.log('getCountry zapros',params);
    const res = await this.get(`/order/country/`, params);
    return res.data;
  };

  getCountryDeliviry = async (params = {}) => {
    //console.log('getCountry zapros',params);
    const res = await this.post(`/order/country/`, params);
    //console.log('getCountry res',res);
    return res.data;
  };



  getCorrespondence = async (params = {}) => {
    //console.log('getCorrespondence zapros',params);
    const res = await this.get(`/order/correspondence/`, params);
    return res.data;
  };

  postCorrespondence = async (params = {}) => {
    //console.log('postCorrespondence zapros',params);
    const res = await this.post(`/order/correspondence/`, params);
    return res.data;
  };

  getOrderItems = async (params = {}) => {
    // console.log('params zapros',params);
    const res = await this.get(`/order/order_items/`, params);
    // console.log('params otvet',res.data);
    return res.data;
  };

  getPaymentsProfile = async (params = {}) => {
    //console.log('getPaymentsProfile zapros',params);
    const res = await this.get('/order/payments/', params);
    return serializePaymentsProfile(res.data);
  };
  updateReceipt = async (id, params) => {
    //console.log('updateReceipt zapros',params);
    const res = await this.put(`/order/payments/${id}/`, params);
    return res;
  };
  getRequizitesShop = async (params) => {
    //console.log('getRequizitesShop zapros',params);
    const res = await this.get(`/order/shop_requisites/`, params);
    return res;
  };
  postRequizitesShop = async (params) => {
    //console.log('postRequizitesShop zapros',params);
    const res = await this.post(`/order/update_shop_requisites/`, params);
    return res;
  };
  createFakeEmptyCollection = async (params) => {
    console.log('createFakeEmptyCollection zapros', params);
    const res = await this.post(`/order/collections/create_fake_empty_collection/`, params);
    console.log('createFakeEmptyCollection otvet', res);
    return res;
  };
  postGetEcuaringLink = async (params) => {
    console.log('postGetEcuaringLink zapros', params)
    const res = await this.post(`/order/payments/get_payu_link/`, params);
    console.log('postGetEcuaringLink otvet', res);
    return res;
  };


}
