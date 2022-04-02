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
    const res = await this.get('/order/delivery_address/', params);
    return serializeAddressDelivery(res.data);
  };

  postOrderAddressDeliviry = async (params = {}, idProfile) => {
    params = serializeAddressDeliveryPost(params, idProfile);
   const res = await this.post('/order/delivery_address/', params);
    return res;
  };
  getByIdOrderAddressDeliviry = async (id, params = {}) => {
    const res = await this.get(`/order/delivery_address/${id}/`, params);
    return res;
  };
  putByIdOrderAddressDeliviry = async (id, params = {}) => {
    params = serializeAddressDeliveryPost(params, id);
    const res = await this.put(`/order/delivery_address/${id}/`, params);
    return res;
  };
  patchByIdOrderAddressDeliviry = async (id, params = {}) => {
    const res = await this.patch(`/order/delivery_address/${id}/`, params);
    return res;
  };
  deleteByIdOrderAddressDeliviry = async (id, params = {}) => {
    const res = await this.delete(`/order/delivery_address/${id}/`, params);
    return res;
  };
  //заказы
  getOrders = async (params = {}) => {
    const res = await this.get('/order/order/', params);
    return serializeOrderData(res.data);
  };
  createOrder = async (params = {}) => {
    const res = await this.post('/order/order/', serializeOrderIsNullField(params));
    return res.data;
  };
  getOrderAddressSearch = async (params = {}) => {
    const res = await this.get('/order/address_search/', params);
    return res.data;
  };
  getRandomRequizites = async (params = {}) => {
    const res = await this.get('/order/get_random_requisites/', params);
    return res.data;
  };
  createPayments = async (params = {}) => {
    const res = await this.post(`/order/payments/`, params);
    return res.data;
  };
  // ******************************************************************************
  returnManyQuery = async (params = {}) => {
    const res = await this.post(`/order/payment_outputs/`, params);
    return res.data;
  };
  // order/order_list
  listOrderItem = async (params = {}) => {
    const res = await this.get(`/order/order/`, params);
    return res.data;
  };

  // order/get_order_items  тестовый список колекции 1
  getOrderItemsList1 = async (params = {}) => {
    const res = await this.get(`/order/order/get_order_items/`, params);
    return res.data;
  };
  // order/get_order_items  тестовый список колекции 2
  getOrderItemsList2 = async (params) => {
    const res = await this.post(`/order/collections/get_collections/`,params);
    return res.data;
  };

  // order/delete_order_item
  deleteOrderItem = async (params = {}) => {
    const res = await this.post(`/order/order/delete_order_item/`, params);
    return res.data;
  };

  // order/delete_order_item
  deleteOrder = async (params = {}) => {
    const res = await this.post(`/order/order/delete_order/`, params);
    return res.data;
  };

  // order/cancel_order_item
  cancelOrderItem = async (params = {}) => {
    const res = await this.post(`/order/order/cancel_order_item/`, params);
    return res.data;
  };

  // order/cancel_order_item
  cancelOrder = async (params = {}) => {
    const res = await this.post(`/order/order/cancel_order/`, params);
    return res.data;
  };

  orderAddComment = async (params = {}) => {
    const res = await this.post('/order/order/add_comment/', params);
    return res.data;
  };

  // ******************************************************************************
  getCountry = async (params = {}) => {
    const res = await this.get(`/order/country/`, params);
    return res.data;
  };

  getCountryDeliviry = async (params = {}) => {
    const res = await this.post(`/order/country/`, params);
    return res.data;
  };

  getCorrespondence = async (params = {}) => {
    const res = await this.get(`/order/correspondence/`, params);
    return res.data;
  };

  postCorrespondence = async (params = {}) => {
    const res = await this.post(`/order/correspondence/`, params);
    return res.data;
  };
// --------------------------------------------------------------
  getCorrespondence_order_item = async (params = {}) => {
    const res = await this.get(`/order/correspondence_order_item/`, params);
    return res.data;
  };

  postCorrespondence_order_item = async (params = {}) => {
    const res = await this.post(`/order/correspondence_order_item/`, params);
    return res.data;
  };
//---------------------------------------------------------------
  getOrderItems = async (params = {}) => {
    const res = await this.get(`/order/order_items/`, params);
    return res.data;
  };

  getPaymentsProfile = async (params = {}) => {
    const res = await this.get('/order/payments/', params);
    return serializePaymentsProfile(res.data);
  };
  updateReceipt = async (id, params) => {
    const res = await this.put(`/order/payments/${id}/`, params);
    return res;
  };
  getRequizitesShop = async (params) => {
    const res = await this.get(`/order/shop_requisites/`, params);
    return res;
  };
  postRequizitesShop = async (params) => {
    const res = await this.post(`/order/update_shop_requisites/`, params);
    return res;
  };
  createFakeEmptyCollection = async (params) => {
    const res = await this.post(`/order/collections/create_fake_empty_collection/`, params);
    return res;
  };
  postGetEcuaringLink = async (params) => {
    const res = await this.post(`/order/payments/get_payu_link/`, params);
    return res;
  };
}
